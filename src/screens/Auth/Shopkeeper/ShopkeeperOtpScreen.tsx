import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import OtpVerificationView from '../../../components/auth/OtpVerificationView';
import { useAuth } from '../../../hooks/useAuth';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { formatIndianMobile } from '../../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'ShopkeeperOtp'>;

export default function ShopkeeperOtpScreen({ route, navigation }: Props) {
  const { login } = useAuth();
  const { phone } = route.params;

  const onVerify = (otp: string) => {
    if (!login(formatIndianMobile(phone), otp, '', 'shopkeeper')) {
      return false;
    }
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'ShopkeeperDashboard' }] }),
    );
    return true;
  };

  return (
    <OtpVerificationView
      phone={phone}
      onBack={() => navigation.goBack()}
      onEditPhone={() => navigation.goBack()}
      onVerify={onVerify}
    />
  );
}