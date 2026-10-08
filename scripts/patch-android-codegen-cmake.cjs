/**
 * Patches React Native New Architecture JNI CMakeLists to link libc++_shared.
 * Without this, Android builds on Windows + NDK 27 can fail with ld.lld undefined
 * symbols (std::__ndk1::..., __cxa_*, operator delete) when linking libreact_codegen_*.so.
 *
 * Packages: react-native-safe-area-context, react-native-screens, react-native-svg,
 * react-native-gesture-handler (libgesturehandler.so).
 * react-native-screens also builds librnscreens.so from android/CMakeLists.txt (TurboModule JNI).
 */
const fs = require('fs');
const path = require('path');

function patchSafeAreaContext() {
  const cmakePath = path.join(
    __dirname,
    '..',
    'node_modules',
    'react-native-safe-area-context',
    'android',
    'src',
    'main',
    'jni',
    'CMakeLists.txt',
  );

  if (!fs.existsSync(cmakePath)) {
    return;
  }

  let s = fs.readFileSync(cmakePath, 'utf8');
  if (s.includes('find_library(CPP_SHARED_LIB c++_shared)')) {
    return;
  }

  const anchor = `  \${LIB_ANDROID_GENERATED_COMPONENTS_DIR}
)

# https://github.com/react-native-community/discussions-and-proposals/discussions/816`;

  const injection = `  \${LIB_ANDROID_GENERATED_COMPONENTS_DIR}
)

# Link libc++ explicitly (fixes Android codegen link with NDK 27 + merged reactnative on Windows).
find_library(CPP_SHARED_LIB c++_shared)

# https://github.com/react-native-community/discussions-and-proposals/discussions/816`;

  if (!s.includes(anchor)) {
    console.warn(
      '[patch-android-codegen-cmake] safe-area-context CMakeLists layout changed; skip.',
    );
    return;
  }

  s = s.replace(anchor, injection);

  s = s.replace(
    `          reactnative
  )
else()`,
    `          reactnative
          \${CPP_SHARED_LIB}
  )
else()`,
  );

  s = s.replace(
    `          yoga
  )
endif()`,
    `          yoga
          \${CPP_SHARED_LIB}
  )
endif()`,
  );

  fs.writeFileSync(cmakePath, s, 'utf8');
  console.log('[patch-android-codegen-cmake] Linked c++_shared in safe-area-context');
}

function patchScreens() {
  const cmakePath = path.join(
    __dirname,
    '..',
    'node_modules',
    'react-native-screens',
    'android',
    'src',
    'main',
    'jni',
    'CMakeLists.txt',
  );

  if (!fs.existsSync(cmakePath)) {
    return;
  }

  let s = fs.readFileSync(cmakePath, 'utf8');
  if (s.includes('find_library(CPP_SHARED_LIB c++_shared)')) {
    return;
  }

  const linkBlock = `target_link_libraries(
  \${LIB_TARGET_NAME}
  ReactAndroid::reactnative
  ReactAndroid::jsi
  fbjni::fbjni
)`;

  const linkBlockPatched = `find_library(CPP_SHARED_LIB c++_shared)

target_link_libraries(
  \${LIB_TARGET_NAME}
  ReactAndroid::reactnative
  ReactAndroid::jsi
  fbjni::fbjni
  \${CPP_SHARED_LIB}
)`;

  if (!s.includes(linkBlock)) {
    console.warn(
      '[patch-android-codegen-cmake] react-native-screens CMakeLists layout changed; skip.',
    );
    return;
  }

  s = s.replace(linkBlock, linkBlockPatched);
  fs.writeFileSync(cmakePath, s, 'utf8');
  console.log('[patch-android-codegen-cmake] Linked c++_shared in react-native-screens (codegen)');
}

/**
 * librnscreens.so — separate from react_codegen_rnscreens; links TurboModule / NativeProxy C++.
 */
function patchScreensAndroidRoot() {
  const cmakePath = path.join(
    __dirname,
    '..',
    'node_modules',
    'react-native-screens',
    'android',
    'CMakeLists.txt',
  );

  if (!fs.existsSync(cmakePath)) {
    return;
  }

  let s = fs.readFileSync(cmakePath, 'utf8');
  if (s.includes('find_library(CPP_SHARED_LIB c++_shared)') && s.includes('project(rnscreens)')) {
    return;
  }

  const anchor = `find_package(ReactAndroid REQUIRED CONFIG)

if(\${RNS_NEW_ARCH_ENABLED})`;

  const injected = `find_package(ReactAndroid REQUIRED CONFIG)
find_library(CPP_SHARED_LIB c++_shared)

if(\${RNS_NEW_ARCH_ENABLED})`;

  if (!s.includes(anchor)) {
    console.warn(
      '[patch-android-codegen-cmake] react-native-screens android/CMakeLists.txt layout changed; skip.',
    );
    return;
  }

  s = s.replace(anchor, injected);

  s = s.replace(
    `    target_link_libraries(rnscreens
        ReactAndroid::reactnative
        ReactAndroid::jsi
        fbjni::fbjni
        android
    )`,
    `    target_link_libraries(rnscreens
        ReactAndroid::reactnative
        ReactAndroid::jsi
        fbjni::fbjni
        android
        \${CPP_SHARED_LIB}
    )`,
  );

  s = s.replace(
    `    target_link_libraries(rnscreens
        ReactAndroid::jsi
        android
    )`,
    `    target_link_libraries(rnscreens
        ReactAndroid::jsi
        android
        \${CPP_SHARED_LIB}
    )`,
  );

  fs.writeFileSync(cmakePath, s, 'utf8');
  console.log('[patch-android-codegen-cmake] Linked c++_shared in react-native-screens (librnscreens)');
}

function patchSvg() {
  const cmakePath = path.join(
    __dirname,
    '..',
    'node_modules',
    'react-native-svg',
    'android',
    'src',
    'main',
    'jni',
    'CMakeLists.txt',
  );

  if (!fs.existsSync(cmakePath)) {
    return;
  }

  let s = fs.readFileSync(cmakePath, 'utf8');
  if (s.includes('find_library(CPP_SHARED_LIB c++_shared)')) {
    return;
  }

  const linkFbjni = `target_link_libraries(
  react_codegen_rnsvg
  fbjni
)`;

  const linkFbjniPatched = `find_library(CPP_SHARED_LIB c++_shared)

target_link_libraries(
  react_codegen_rnsvg
  fbjni
  \${CPP_SHARED_LIB}
)`;

  if (!s.includes(linkFbjni)) {
    console.warn(
      '[patch-android-codegen-cmake] react-native-svg CMakeLists layout changed; skip.',
    );
    return;
  }

  s = s.replace(linkFbjni, linkFbjniPatched);
  fs.writeFileSync(cmakePath, s, 'utf8');
  console.log('[patch-android-codegen-cmake] Linked c++_shared in react-native-svg');
}

function patchGestureHandler() {
  const cmakePath = path.join(
    __dirname,
    '..',
    'node_modules',
    'react-native-gesture-handler',
    'android',
    'src',
    'main',
    'jni',
    'CMakeLists.txt',
  );

  if (!fs.existsSync(cmakePath)) {
    return;
  }

  let s = fs.readFileSync(cmakePath, 'utf8');
  if (s.includes('find_library(CPP_SHARED_LIB c++_shared)')) {
    return;
  }

  const linkBlock = `target_link_libraries(
  \${PACKAGE_NAME}
  ReactAndroid::reactnative
  ReactAndroid::jsi
  fbjni::fbjni
)`;

  const linkBlockPatched = `find_library(CPP_SHARED_LIB c++_shared)

target_link_libraries(
  \${PACKAGE_NAME}
  ReactAndroid::reactnative
  ReactAndroid::jsi
  fbjni::fbjni
  \${CPP_SHARED_LIB}
)`;

  if (!s.includes(linkBlock)) {
    console.warn(
      '[patch-android-codegen-cmake] react-native-gesture-handler CMakeLists layout changed; skip.',
    );
    return;
  }

  s = s.replace(linkBlock, linkBlockPatched);
  fs.writeFileSync(cmakePath, s, 'utf8');
  console.log('[patch-android-codegen-cmake] Linked c++_shared in react-native-gesture-handler');
}

patchSafeAreaContext();
patchScreens();
patchScreensAndroidRoot();
patchSvg();
patchGestureHandler();
