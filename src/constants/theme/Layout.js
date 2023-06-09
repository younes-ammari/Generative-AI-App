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


const SMALL_MARGIN = 4;
const MEDIUM_MARGIN = 12;
const LARGE_MARGIN = 18;
const X_LARGE_MARGIN = 22;

const SMALL_PADDING = 8;
const MEDIUM_PADDING = 16;
const LARGE_PADDING = 18;
const X_LARGE_PADDING = 33;

const SMALL_RADIUS = 4;
const MEDIUM_RADIUS = 8;
const LARGE_RADIUS = 16;
const X_LARGE_RADIUS = 55;

const Layout = {
  dimension: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  /**
   * small = 4 
   * medium = 12
   * large = 18
   * xlarge = 22
   */
  margin: {
    small: SMALL_MARGIN,
    medium: MEDIUM_MARGIN,
    large: LARGE_MARGIN,
    xlarge: X_LARGE_MARGIN,
  },
  /**
   * small = 8 
   * medium = 16
   * large = 18
   * xlarge = 33
   */
  padding: {
    small: SMALL_PADDING,
    medium: MEDIUM_PADDING,
    large: LARGE_PADDING,
    xlarge: X_LARGE_PADDING,
  },
  /**
   * small = 4 
   * medium = 8
   * large = 16
   */
  radius: {
    small: SMALL_RADIUS,
    medium: MEDIUM_RADIUS,
    large: LARGE_RADIUS,
    xlarge: X_LARGE_RADIUS,
  },
  /**
    h0: 22,
    h1: 18,
    h2: 15,
    h3: 13,
    h4: 11,
    h5: 9,
   */
  font: {
    h0: 22,
    h1: 18,
    h2: 15,
    h3: 13,
    h4: 11,
    h5: 9,
  }
};

export default Layout;
