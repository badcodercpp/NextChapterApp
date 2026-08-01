// import { AppIcon, AppScreen, AppText } from '@/components';
// import { Image, ImageBackground, Pressable, View } from 'react-native';

// import { ArrowRightIcon } from 'lucide-react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// export function LandingScreen() {
//   const navigation = useNavigation();

//   return (
//     <View className="flex-1 bg-[red]">
//       <View
//         className="flex-1 bg-[red]"
//         style={{ backgroundColor: '#141129', flex: 1 }}
//       >
//         {/* Bottom Artwork */}
//         <ImageBackground
//           source={require('@/assets/images/landing-background.png')}
//           resizeMode="cover"
//           className="absolute bottom-0 left-0 right-0 h-[55%]"
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             width: '100%',
//             height: 300,
//           }}
//         >
//           <LinearGradient
//             colors={['#141129', 'rgba(20,17,41,0.75)', 'transparent']}
//             locations={[0, 0.2, 0.45, 1]}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//             }}
//           />
//         </ImageBackground>

//         {/* Main Content */}
//         <View className="flex-1 justify-between">
//           {/* ================= HERO ================= */}

//           <View className="items-center pt-10 px-8">
//             {/* Logo */}
//             <View
//               className="
//                   h-28
//                   w-28
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#13263E]
//                 "
//             >
//               <Image
//                 source={require('@/assets/images/logo.png')}
//                 resizeMode="contain"
//                 className="h-20 w-20"
//               />
//             </View>

//             {/* Brand */}
//             <View className="mt-8 items-center">
//               <AppText
//                 variant="h1"
//                 style={{
//                   fontSize: 54,
//                   fontWeight: '700',
//                   color: '#FFFFFF',
//                 }}
//               >
//                 NextChapter
//               </AppText>

//               <AppText
//                 variant="caption"
//                 style={{
//                   marginTop: 8,
//                   letterSpacing: 3,
//                   color: '#B7B2D7',
//                   textTransform: 'uppercase',
//                 }}
//               >
//                 AI RECOVERY COMPANION
//               </AppText>
//             </View>

//             {/* Headline */}

//             <View className="mt-20 items-center">
//               <AppText
//                 variant="h2"
//                 style={{
//                   fontSize: 22,
//                   lineHeight: 38,
//                   color: '#FFFFFF',
//                   textAlign: 'center',
//                   fontWeight: '500',
//                 }}
//               >
//                 Every ending is the beginning of
//               </AppText>

//               <AppText
//                 variant="h2"
//                 style={{
//                   marginTop: 8,
//                   fontSize: 22,
//                   lineHeight: 38,
//                   color: '#FFFFFF',
//                   textAlign: 'center',
//                   fontWeight: '500',
//                 }}
//               >
//                 your next chapter.
//               </AppText>

//               <AppText
//                 variant="body"
//                 style={{
//                   marginTop: 30,
//                   color: '#9087B8',
//                   fontSize: 17,
//                 }}
//               >
//                 Heal • Grow • Move Forward
//               </AppText>
//             </View>
//           </View>
//           {/* ================= CTA ================= */}

//           <View className="px-6 pb-10">
//             <Pressable
//               onPress={() => navigation.navigate('Onboarding' as never)}
//               style={{
//                 borderRadius: 18,
//                 overflow: 'hidden',
//                 shadowColor: '#9B4DFF',
//                 shadowOpacity: 0.35,
//                 shadowRadius: 18,
//                 shadowOffset: {
//                   width: 0,
//                   height: 10,
//                 },
//                 elevation: 12,
//               }}
//             >
//               <LinearGradient
//                 colors={['#7C3AED', '#9333EA', '#C026D3']}
//                 start={{
//                   x: 0,
//                   y: 0,
//                 }}
//                 end={{
//                   x: 1,
//                   y: 0,
//                 }}
//                 style={{
//                   height: 64,
//                   borderRadius: 18,
//                   paddingHorizontal: 24,
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <AppText
//                   variant="body"
//                   style={{
//                     color: '#FFFFFF',
//                     fontSize: 22,
//                     fontWeight: '700',
//                   }}
//                 >
//                   Begin Your Journey
//                 </AppText>

//                 <AppIcon icon={ArrowRightIcon} size={22} />
//               </LinearGradient>
//             </Pressable>

//             {/* Login */}

//             <View
//               style={{
//                 marginTop: 28,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <AppText
//                 variant="body"
//                 style={{
//                   color: '#A39CBF',
//                   fontSize: 17,
//                 }}
//               >
//                 Already have an account?
//               </AppText>

//               <Pressable onPress={() => navigation.navigate('Login' as never)}>
//                 <AppText
//                   variant="body"
//                   style={{
//                     marginLeft: 6,
//                     color: '#FFFFFF',
//                     fontWeight: '700',
//                     fontSize: 17,
//                   }}
//                 >
//                   Log In
//                 </AppText>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

import { Text, View } from 'react-native';

export function LandingScreen() {
  return (
    <View
      style={{ flex: 1 }}
      className="items-center justify-center bg-red-500"
    >
      <Text className="text-white text-3xl">Hello</Text>
    </View>
  );
}
