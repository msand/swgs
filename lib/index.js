'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Use = exports.TextPath = exports.TSpan = exports.Text = exports.Symbol = exports.Svg = exports.Stop = exports.Rect = exports.RadialGradient = exports.Polyline = exports.Polygon = exports.Path = exports.LinearGradient = exports.Line = exports.Image = exports.G = exports.Ellipse = exports.Defs = exports.ClipPath = exports.Circle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ripOut = require('rip-out');

var _ripOut2 = _interopRequireDefault(_ripOut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
  var clean = (0, _ripOut2.default)(props, 'translate', 'scale', 'rotate', 'skewX', 'skewY', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle');

  var transform = [];
  var style = {};

  //
  // Correctly apply the transformation properties.
  //
  if ('translate' in props) transform.push('translate(' + props.translate + ')');
  if ('scale' in props) transform.push('scale(' + props.scale + ')');
  if ('rotate' in props) transform.push('rotate(' + props.rotate + ')');
  if ('skewX' in props) transform.push('skewX(' + props.skewX + ')');
  if ('skewY' in props) transform.push('skewY(' + props.skewY + ')');
  if (transform.length) clean.transform = transform.join(' ');

  //
  // This is the nasty part where we depend on React internals to work as
  // intended. If we add an empty object as style, it shouldn't render a `style`
  // attribute. So we can safely conditionally add things to our `style` object
  // and re-introduce it to our `clean` object
  //
  copypaste(props, style, 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle');
  clean.style = style;

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
  return _react2.default.createElement('circle', prepare(props));
}

/**
 * Return a clipPath SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} ClipPath SVG.
 * @public
 */
function ClipPath(props) {
  return _react2.default.createElement('clipPath', prepare(props));
}

/**
 * Return a defs SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Defs SVG.
 * @public
 */
function Defs(props) {
  return _react2.default.createElement('defs', prepare(props));
}

/**
 * Return a ellipse SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Ellipse SVG.
 * @public
 */
function Ellipse(props) {
  return _react2.default.createElement('ellipse', prepare(props));
}

/**
 * Return a g SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} G SVG.
 * @public
 */
function G(props) {
  return _react2.default.createElement('g', prepare(props));
}

/**
 * Return a image SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Image SVG.
 * @public
 */
function Image(props) {
  return _react2.default.createElement('image', prepare(props));
}

/**
 * Return a line SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Line SVG.
 * @public
 */
function Line(props) {
  return _react2.default.createElement('line', prepare(props));
}

/**
 * Return a linearGradient SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} LinearGradient SVG.
 * @public
 */
function LinearGradient(props) {
  return _react2.default.createElement('linearGradient', prepare(props));
}

/**
 * Return a path SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Path SVG.
 * @public
 */
function Path(props) {
  return _react2.default.createElement('path', prepare(props));
}

/**
 * Return a polygon SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Polygon SVG.
 * @public
 */
function Polygon(props) {
  return _react2.default.createElement('polygon', prepare(props));
}

/**
 * Return a polyline SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Polyline SVG.
 * @public
 */
function Polyline(props) {
  return _react2.default.createElement('polyline', prepare(props));
}

/**
 * Return a radialGradient SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} RadialGradient SVG.
 * @public
 */
function RadialGradient(props) {
  return _react2.default.createElement('radialGradient', prepare(props));
}

/**
 * Return a rect SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Rect SVG.
 * @public
 */
function Rect(props) {
  return _react2.default.createElement('rect', prepare(props));
}

/**
 * Return a stop SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Stop SVG.
 * @public
 */
function Stop(props) {
  return _react2.default.createElement('stop', prepare(props));
}

/**
 * Return a SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} SVG.
 * @public
 */
function Svg(props) {
  return _react2.default.createElement('svg', prepare(props));
}

/**
 * Return a symbol SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Symbol SVG.
 * @public
 */
function _Symbol(props) {
  return _react2.default.createElement('symbol', prepare(props));
}

/**
 * Return a text SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Text SVG.
 * @public
 */
function Text(props) {
  var x = props.x,
      y = props.y,
      dx = props.dx,
      dy = props.dy,
      rotate = props.rotate,
      rest = _objectWithoutProperties(props, ['x', 'y', 'dx', 'dy', 'rotate']);

  var directAttributes = { x: x, y: y, dx: dx, dy: dy, rotate: rotate };
  return _react2.default.createElement('text', _extends({}, prepare(rest), directAttributes));
}

/**
 * Return a tspan SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} TSpan SVG.
 * @public
 */
function TSpan(props) {
  var x = props.x,
      y = props.y,
      dx = props.dx,
      dy = props.dy,
      rotate = props.rotate,
      rest = _objectWithoutProperties(props, ['x', 'y', 'dx', 'dy', 'rotate']);

  var directAttributes = { x: x, y: y, dx: dx, dy: dy, rotate: rotate };
  return _react2.default.createElement('tspan', _extends({}, prepare(rest), directAttributes));
}

/**
 * Return a textpath SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} TextPath SVG.
 * @public
 */
function TextPath(props) {
  return _react2.default.createElement('textpath', prepare(props));
}

/**
 * Return a use SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Use SVG.
 * @public
 */
function Use(props) {
  return _react2.default.createElement('use', prepare(props));
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
exports.Path = Path;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.RadialGradient = RadialGradient;
exports.Rect = Rect;
exports.Stop = Stop;
exports.Svg = Svg;
exports.Symbol = _Symbol;
exports.Text = Text;
exports.TSpan = TSpan;
exports.TextPath = TextPath;
exports.Use = Use;
exports.default = Svg;