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
const MEDIUM_MARGIN = 16;
const LARGE_MARGIN = 18;

const SMALL_PADDING = 8;
const MEDIUM_PADDING = 16;
const LARGE_PADDING = 18;
const XLARGE_PADDING = 33;

const LARGE_RADIUS = 16;
const MEDIUM_RADIUS = 8;
const SMALL_RADIUS = 4;

const Layout = {
  dimension: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  /**
   * small = 8 
   * medium = 16
   * large = 18
   */
  margin: {
    small: SMALL_MARGIN,
    medium: MEDIUM_MARGIN,
    large: LARGE_MARGIN
  },
  /**
   * small = 8 
   * medium = 16
   * large = 18
   */
  padding: {
    small: SMALL_PADDING,
    medium: MEDIUM_PADDING,
    large: LARGE_PADDING,
    xlarge: XLARGE_PADDING,
  },
  /**
   * small = 4 
   * medium = 8
   * large = 16
   */
  radius: {
    small: SMALL_RADIUS,
    medium: MEDIUM_RADIUS,
    large: LARGE_RADIUS
  }
};

export default Layout;
