
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-community/async-storage-backend-legacy
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// react-native-build-config
import com.ismaeld.RNBuildConfig.RNBuildConfigPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-config
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-inappbrowser-reborn
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-localize
import com.reactcommunity.rnlocalize.RNLocalizePackage;
// react-native-maps
import com.airbnb.android.react.maps.MapsPackage;
// react-native-mixpanel
import com.kevinejohn.RNMixpanel.RNMixpanel;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-snackbar
import com.azendoo.reactnativesnackbar.SnackbarPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-secure-storage
import com.taluttasgiran.rnsecurestorage.RNSecureStoragePackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new GeolocationPackage(),
      new RNBuildConfigPackage(com.spoonandfork.BuildConfig.class),
      new RNCameraPackage(),
      new ReactNativeConfigPackage(),
      new RNDeviceInfo(),
      new FastImageViewPackage(),
      new PickerPackage(),
      new RNInAppBrowserPackage(),
      new LinearGradientPackage(),
      new RNLocalizePackage(),
      new MapsPackage(),
      new RNMixpanel(),
      new RNPermissionsPackage(),
      new SnackbarPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new RNCWebViewPackage(),
      new RNSecureStoragePackage()
    ));
  }
}
