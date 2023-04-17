import { WalletClass, walletAddresses } from '@/types/wallet'
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
// import { THORChainApp } from "@thorchain/ledger-thorchain/lib/app";

export class LedgerClass implements WalletClass {
  static icon: string = '/wallets/ledger.svg'
  address: walletAddresses = {}
  path = [44, 931, 0, 0, 0];

  async getTransport() {
    let transport = null;

    try {
      transport = await TransportWebUSB.create();
    } catch (e) {
      console.error(e);
    }

    return transport;
  }


  constructor() {
  }

  async connect() {
    try {
      const transport = await this.getTransport();
      if (!transport)
        return
      // const app = new THORChainApp(transport);
      // const thorAddr = await app.showAddressAndPubKey(this.path, "tthor");
      // this.address['thor'] = thorAddr.bech32Address;

    } catch (e) {
      return
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
