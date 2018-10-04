'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Use = exports.TextPath = exports.Text = exports.TSpan = exports.Symbol = exports.Svg = exports.Stop = exports.Rect = exports.RadialGradient = exports.Polyline = exports.Polygon = exports.Pattern = exports.Path = exports.Mask = exports.LinearGradient = exports.Line = exports.Image = exports.G = exports.Ellipse = exports.Defs = exports.ClipPath = exports.Circle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNativeWeb = require('react-native-web');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ripOut = require('rip-out');

var _ripOut2 = _interopRequireDefault(_ripOut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * PropType specification where a value can be represented as number and string.
 *
 * @type {PropTypes}
 * @private
 */
var numb = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]);

/**
 * Helper function to copy and paste over properties to a different object if
 * they exists.
 *
 * @param {Object} from Object to copy from.
 * @param {Object} to Object to paste to.
 * @param {String} props Name of the property
 * @private
 */
function copypaste(from, to) {
  for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    props[_key - 2] = arguments[_key];
  }

  props.forEach(function (prop) {
    if (prop in from) to[prop] = from[prop];
  });
}

/**
 * The `react-native-svg` has some crazy api's that do not match with the
 * properties that can be applied to SVG elements. This prepare function removes
 * those properties and adds the properties back in their correct location.
 *
 * @param {Object} props Properties given to us.
 * @returns {Object} Cleaned object.
 * @private
 */
function prepare(props) {
  var clean = (0, _ripOut2.default)(props, 'translate', 'scale', 'rotate', 'skewX', 'skewY', 'originX', 'originY', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'style');

  var transform = [];

  //
  // Correctly apply the transformation properties.
  // To apply originX and originY we need to translate the element on those values and
  // translate them back once the element is scaled, rotated and skewed.
  //
  if ('originX' in props || 'originY' in props) transform.push('translate(' + (props.originX || 0) + ', ' + (props.originY || 0) + ')');
  if ('translate' in props) transform.push('translate(' + props.translate + ')');
  if ('scale' in props) transform.push('scale(' + props.scale + ')');
  if ('rotate' in props) transform.push('rotate(' + props.rotate + ')');
  if ('skewX' in props) transform.push('skewX(' + props.skewX + ')');
  if ('skewY' in props) transform.push('skewY(' + props.skewY + ')');
  if ('originX' in props || 'originY' in props) transform.push('translate(' + (-props.originX || 0) + ', ' + (-props.originY || 0) + ')');
  if (transform.length) clean.transform = transform.join(' ');

  //
  // Correctly set the initial style value.
  //
  var style = 'style' in props ? props.style : {};

  //
  // This is the nasty part where we depend on React internals to work as
  // intended. If we add an empty object as style, it shouldn't render a `style`
  // attribute. So we can safely conditionally add things to our `style` object
  // and re-introduce it to our `clean` object
  //
  copypaste(props, style, 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle');
  clean.style = style;

  //
  // React-Native svg provides as a default of `xMidYMid` if aspectRatio is not
  // specified with align information. So we need to support this behavior and
  // correctly default to `xMidYMid [mode]`.
  //
  var preserve = clean.preserveAspectRatio;
  if (preserve && preserve !== 'none' && !~preserve.indexOf(' ')) {
    clean.preserveAspectRatio = 'xMidYMid ' + preserve;
  }

  return clean;
}

/**
 * Return a circle SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Circle SVG.
 * @public
 */
function Circle(props) {
  return (0, _reactNativeWeb.createElement)('circle', prepare(props));
}

/**
 * Return a clipPath SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} ClipPath SVG.
 * @public
 */
function ClipPath(props) {
  return (0, _reactNativeWeb.createElement)('clipPath', prepare(props));
}

/**
 * Return a defs SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Defs SVG.
 * @public
 */
function Defs(props) {
  return (0, _reactNativeWeb.createElement)('defs', prepare(props));
}

/**
 * Return a ellipse SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Ellipse SVG.
 * @public
 */
function Ellipse(props) {
  return (0, _reactNativeWeb.createElement)('ellipse', prepare(props));
}

/**
 * Return a g SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} G SVG.
 * @public
 */
function G(props) {
  var x = props.x,
      y = props.y,
      rest = _objectWithoutProperties(props, ['x', 'y']);

  if ((x || y) && !rest.translate) {
    rest.translate = (x || 0) + ', ' + (y || 0);
  }

  return (0, _reactNativeWeb.createElement)('g', prepare(rest));
}

/**
 * PropType validation for the <G />.
 *
 * @type {Object}
 * @private
 */
G.propTypes = {
  x: numb,
  y: numb
};

/**
 * Return a image SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Image SVG.
 * @public
 */
function Image(props) {
  return (0, _reactNativeWeb.createElement)('image', prepare(props));
}

/**
 * Return a line SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Line SVG.
 * @public
 */
function Line(props) {
  return (0, _reactNativeWeb.createElement)('line', prepare(props));
}

/**
 * Return a linearGradient SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} LinearGradient SVG.
 * @public
 */
function LinearGradient(props) {
  return (0, _reactNativeWeb.createElement)('linearGradient', prepare(props));
}

/**
 * Return a path SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Path SVG.
 * @public
 */
function Path(props) {
  return (0, _reactNativeWeb.createElement)('path', prepare(props));
}

/**
 * Return a polygon SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Polygon SVG.
 * @public
 */
function Polygon(props) {
  return (0, _reactNativeWeb.createElement)('polygon', prepare(props));
}

/**
 * Return a polyline SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Polyline SVG.
 * @public
 */
function Polyline(props) {
  return (0, _reactNativeWeb.createElement)('polyline', prepare(props));
}

/**
 * Return a radialGradient SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} RadialGradient SVG.
 * @public
 */
function RadialGradient(props) {
  return (0, _reactNativeWeb.createElement)('radialGradient', prepare(props));
}

/**
 * Return a rect SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Rect SVG.
 * @public
 */
function Rect(props) {
  return (0, _reactNativeWeb.createElement)('rect', prepare(props));
}

/**
 * Return a stop SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Stop SVG.
 * @public
 */
function Stop(props) {
  return (0, _reactNativeWeb.createElement)('stop', prepare(props));
}

/**
 * Return a SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} SVG.
 * @public
 */
function Svg(props) {
  var title = props.title,
      rest = _objectWithoutProperties(props, ['title']);

  if (title) {
    return (0, _reactNativeWeb.createElement)('svg', _extends({ 'role': 'img', 'aria-label': '[title]' }, prepare(rest)), [(0, _reactNativeWeb.createElement)('title', {}, title), props.children]);
  }

  return (0, _reactNativeWeb.createElement)('svg', prepare(rest));
}

/**
 * PropType validation for the <Svg />.
 *
 * @type {Object}
 * @private
 */
Svg.propTypes = {
  title: _propTypes2.default.string,
  children: _propTypes2.default.any
};

/**
 * Return a symbol SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Symbol SVG.
 * @public
 */
function _Symbol(props) {
  return (0, _reactNativeWeb.createElement)('symbol', prepare(props));
}

/**
 * Return a text SVG element.
 *
 * @returns {React.Component} Text SVG.
 * @public
 * @param {Object} props The properties that are spread on the SVG element.
 * @param {String} props.x x position
 * @param {String} props.y y position
 * @param {String} props.dx delta x
 * @param {String} props.dy delta y
 * @param {String} props.rotate rotation
 */
function Text(props) {
  var x = props.x,
      y = props.y,
      dx = props.dx,
      dy = props.dy,
      rotate = props.rotate,
      rest = _objectWithoutProperties(props, ['x', 'y', 'dx', 'dy', 'rotate']);

  return (0, _reactNativeWeb.createElement)('text', _extends({}, prepare(rest), { x: x, y: y, dx: dx, dy: dy, rotate: rotate }));
}

/**
 * PropType validation for the <Text />.
 *
 * @type {Object}
 * @private
 */
Text.propTypes = {
  x: numb,
  y: numb,
  dx: numb,
  dy: numb,
  rotate: numb
};

/**
 * Return a tspan SVG element.
 *
 * @returns {React.Component} TSpan SVG.
 * @public
 * @param {Object} props The properties that are spread on the SVG element.
 * @param {String} props.x x position
 * @param {String} props.y y position
 * @param {String} props.dx delta x
 * @param {String} props.dy delta y
 * @param {String} props.rotate rotation
 */
function TSpan(props) {
  var x = props.x,
      y = props.y,
      dx = props.dx,
      dy = props.dy,
      rotate = props.rotate,
      rest = _objectWithoutProperties(props, ['x', 'y', 'dx', 'dy', 'rotate']);

  return (0, _reactNativeWeb.createElement)('tspan', _extends({}, prepare(rest), { x: x, y: y, dx: dx, dy: dy, rotate: rotate }));
}

/**
 * PropType validation for the <TSpan />.
 *
 * @type {Object}
 * @private
 */
TSpan.propTypes = Text.propTypes;

/**
 * Return a textpath SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} TextPath SVG.
 * @public
 */
function TextPath(props) {
  return (0, _reactNativeWeb.createElement)('textPath', prepare(props));
}

/**
 * Return a use SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Use SVG.
 * @public
 */
function Use(props) {
  return (0, _reactNativeWeb.createElement)('use', prepare(props));
}

/**
 * Return a mask SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Use SVG.
 * @public
 */
function Mask(props) {
  return (0, _reactNativeWeb.createElement)('mask', prepare(props));
}

/**
 * Return a pattern SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Use SVG.
 * @public
 */
function Pattern(props) {
  return (0, _reactNativeWeb.createElement)('pattern', prepare(props));
}

//
// Expose everything in the same way as `react-native-svg` is doing.
//
exports.Circle = Circle;
exports.ClipPath = ClipPath;
exports.Defs = Defs;
exports.Ellipse = Ellipse;
exports.G = G;
exports.Image = Image;
exports.Line = Line;
exports.LinearGradient = LinearGradient;
exports.Mask = Mask;
exports.Path = Path;
exports.Pattern = Pattern;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.RadialGradient = RadialGradient;
exports.Rect = Rect;
exports.Stop = Stop;
exports.Svg = Svg;
exports.Symbol = _Symbol;
exports.TSpan = TSpan;
exports.Text = Text;
exports.TextPath = TextPath;
exports.Use = Use;
exports.default = Svg;