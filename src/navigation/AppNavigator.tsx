import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/common/LanguageSelector';
import HomeScreen from '../screens/Home/HomeScreen';
import BookSlotScreen from '../screens/Booking/BookSlotScreen';
import BookingConfirmationScreen from '../screens/Booking/BookingConfirmationScreen';
import BookingDetailsScreen from '../screens/Booking/BookingDetailsScreen';
import CancelBookingScreen from '../screens/Booking/CancelBookingScreen';
import BookingRedirectScreen from '../screens/Salon/BookingRedirectScreen';
import SalonDetailsScreen from '../screens/Salon/SalonDetailsScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import CustomerLoginScreen from '../screens/Auth/Customer/CustomerLoginScreen';
import CustomerSignupScreen from '../screens/Auth/Customer/CustomerSignupScreen';
import CustomerOtpScreen from '../screens/Auth/Customer/CustomerOtpScreen';
import ShopkeeperLoginScreen from '../screens/Auth/Shopkeeper/ShopkeeperLoginScreen';
import ShopkeeperSignupScreen from '../screens/Auth/Shopkeeper/ShopkeeperSignupScreen';
import ShopkeeperOtpScreen from '../screens/Auth/Shopkeeper/ShopkeeperOtpScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import PaymentMethodsScreen from '../screens/Profile/PaymentMethodsScreen';
import SavedAddressesScreen from '../screens/Profile/SavedAddressesScreen';
import NotificationsScreen from '../screens/Profile/NotificationsScreen';
import HelpSupportScreen from '../screens/Profile/HelpSupportScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import OffersScreen from '../screens/Offers/OffersScreen';
import TermsScreen from '../screens/Legal/TermsScreen';
import PrivacyScreen from '../screens/Legal/PrivacyScreen';
import QueueScreen from '../screens/Queue/QueueScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import { useTheme } from '../theme/useTheme';

export type OtpMode = 'verify' | 'resetPassword';

export type RootStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  Login:
    | { salonId?: string; slotLabel?: string; dateIso?: string; serviceIds?: string[] }
    | undefined;
  Otp: {
    phone: string;
    salonId?: string;
    slotLabel?: string;
    dateIso?: string;
    serviceIds?: string[];
    mode?: OtpMode;
    password?: string;
    role?: 'customer' | 'shopkeeper';
  };
  CustomerLogin:
    | { salonId?: string; slotLabel?: string; dateIso?: string; serviceIds?: string[] }
    | undefined;
  CustomerSignup: undefined;
  CustomerOtp: {
    phone: string;
    salonId?: string;
    slotLabel?: string;
    dateIso?: string;
    serviceIds?: string[];
  };
  ShopkeeperLogin: undefined;
  ShopkeeperSignup: undefined;
  ShopkeeperOtp: { phone: string };
  ShopkeeperDashboard: undefined;
  BookingConfirmation: {
    salonId: string;
    slotLabel: string;
    dateIso: string;
    phone: string;
    serviceIds: string[];
    bookingId: string;
  };
  BookingDetails: { bookingId: string };
  CancelBooking: { bookingId: string };
  ForgotPassword: undefined;
  ResetPassword: { phone: string };
  Signup: undefined;
  SalonDetails: { salonId: string };
  BookSlot: { salonId: string; serviceIds?: string[] };
  /** @deprecated use SalonDetails — kept for old bundle redirects */
  Booking: { title?: string; salonId?: string };
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  PaymentMethods: undefined;
  SavedAddresses: undefined;
  Notifications: undefined;
  HelpSupport: undefined;
  About: undefined;
  Favorites: undefined;
  Offers: undefined;
  Terms: undefined;
  Privacy: undefined;
  Queue: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const DEV_INITIAL_ROUTE: keyof RootStackParamList = 'CustomerLogin';

const HEADERLESS = new Set([
  'Splash',
  'RoleSelection',
  'Home',
  'SalonDetails',
  'BookSlot',
  'Login',
  'Signup',
  'Otp',
  'ForgotPassword',
  'ResetPassword',
  'BookingConfirmation',
  'Profile',
  'Favorites',
  'Offers',
  'Queue',
  'CustomerLogin',
  'CustomerSignup',
  'CustomerOtp',
  'ShopkeeperLogin',
  'ShopkeeperSignup',
  'ShopkeeperOtp',
  'ShopkeeperDashboard',
]);

export default function AppNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={__DEV__ ? DEV_INITIAL_ROUTE : 'Splash'}
      screenOptions={({ route }) => {
        const auth =
          route.name === 'Login' ||
          route.name === 'Signup' ||
          route.name === 'Otp' ||
          route.name === 'ForgotPassword' ||
          route.name === 'ResetPassword';
        return {
          headerShown: !HEADERLESS.has(route.name),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          contentStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerRight: () =>
            auth ? <LanguageSelector variant="dropdownText" /> : <LanguageSelector />,
        };
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Offers" component={OffersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CustomerSignup" component={CustomerSignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CustomerOtp" component={CustomerOtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperLogin" component={ShopkeeperLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperSignup" component={ShopkeeperSignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperOtp" component={ShopkeeperOtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="SalonDetails"
        component={SalonDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BookSlot" component={BookSlotScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CancelBooking" component={CancelBookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerShown: false }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Booking"
        component={BookingRedirectScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen name="Queue" component={QueueScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
