import styles from './Scanner.styles';
import React, {useEffect, useState} from 'react';
import ScannedBags from 'components/scanner/ScannedBags';
import Button from 'components/button/Button';
import {useScannerActions} from 'state/restaurant/hooks/UseActions';
import {
  // Image, TouchableOpacity,
  View,
} from 'react-native';
// import {Accept, Approve} from './assets';
import {useSelector} from 'state/hooks';
import {SafeAreaView} from 'components/index';
import {NavigateToScannerSubmitAction} from 'state/ducks/router/actions';
import RequireLoadable from 'components/require/RequireLoadable';
import {isDevelop} from 'app/Config';
import {State} from 'state/entities/State';
import {useParams} from 'react-router';
import QRCodeScanner from 'react-native-qrcode-scanner/index';
// import {ScannerBag, ScannerMode} from 'state/restaurant/entities/Scanner';

export interface ScannerProps {
  confirmAction: NavigateToScannerSubmitAction;
  orderId?: string;
}

const Scanner: React.FC = () => {
  const state = useSelector((state: State) => state.scanner);
  const actions = useScannerActions();

  const {id} = useParams();

  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // const mode: ScannerMode;
  //
  // const button = (bags: ScannerBag[]) => {
  //   switch (mode) {
  //     case ScannerMode.checkable: {
  //       const bagScanned = bags.filter((bag) => bag.scanned);
  //       return buttonDisplay(bagScanned.length !== bags.length);
  //     }
  //     case ScannerMode.deletable:
  //       return buttonDisplay(!bags[0]);
  //   }
  //   return (
  //     <TouchableOpacity onPress={() => actions.confirmBags(id, bag)}>
  //       <Image source={Accept} style={styles.button} />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.scanBags}>
        <View style={styles.camera}>
          {isMounted && (
            <QRCodeScanner
              containerStyle={styles.containerStyle}
              reactivate
              reactivateTimeout={1000}
              onRead={({data}) => actions.confirmBags(id, data)}
              cameraStyle={styles.cameraStyle}
            />
          )}
        </View>
        <View style={styles.overlay}>
          <RequireLoadable data={state}>
            {({bags, mode}) => {
              return (
                <>
                  <View style={styles.scannedBags}>
                    <ScannedBags
                      bags={bags}
                      mode={mode}
                      deletePress={actions.deleteBag}
                    />
                  </View>

                  <View style={styles.buttonsContainer}>
                    {isDevelop() && (
                      <>
                        <Button
                          title="11111"
                          visualStyle="solid"
                          style={styles.button}
                          onPress={() => actions.codeReceived('11111')}
                        />
                        <Button
                          title="22222"
                          visualStyle="solid"
                          style={styles.button}
                          onPress={() => actions.codeReceived('22222')}
                        />
                      </>
                    )}
                    {/* {button(bags)} */}
                  </View>
                </>
              );
            }}
          </RequireLoadable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Scanner;
