// import dependencies
import { Dimensions, Platform, StatusBar } from 'react-native';


// Layout Config
const screen = Dimensions.get('window');
const android = Platform.OS === 'android';
const statusBarHeight = android ? StatusBar.currentHeight : 0;

let SCREEN_HEIGHT = android ? screen.height - statusBarHeight : screen.height;
let SCREEN_WIDTH = screen.width;

SCREEN_WIDTH = SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
SCREEN_HEIGHT = SCREEN_HEIGHT > SCREEN_WIDTH ? SCREEN_HEIGHT : SCREEN_WIDTH;

const SMALL_MARGIN = 8;
const SMALL_PADDING = 8;
const MEDIUM_MARGIN = 16;
const MEDIUM_PADDING = 16;
const LARGE_MARGIN = 18;
const LARGE_RADIUS = 4;
const MEDIUM_RADIUS = 8;
const SMALL_RADIUS = 16;


const layout = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SMALL_MARGIN,
  SMALL_PADDING,
  MEDIUM_MARGIN,
  MEDIUM_PADDING,
  LARGE_MARGIN,
  LARGE_PADDING,
  LARGE_RADIUS,
  MEDIUM_RADIUS,
  SMALL_RADIUS
};

export default layout;
