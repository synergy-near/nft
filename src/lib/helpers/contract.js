import { ethers, BigNumber } from 'ethers';

const RgldAddress = "0x976F6A26e5A05bf07296615F3520D9E71B254875";
import RgldABI from "./RGLD.json";


const NftAddress = "0x70Ded164D82a87B3253Ed8ef18d0E6a582912143"
import NftABI from "./NFT.json"


class ContractSDK {
    constructor(signer) {
        this.signer = signer;
        this.rgldContract = new ethers.Contract(RgldAddress, RgldABI, signer);
        this.nftContract = new ethers.Contract(NftAddress, NftABI, signer);
    }

    async getRgldBalance() {
        const userAddress = await this.signer.getAddress()

        let rgldBalance;
        try {
            rgldBalance = await this.rgldContract.balanceOf(userAddress);
            return BigNumber.from(rgldBalance).div(BigNumber.from("10").pow(18))
        }
        catch (error) {
            console.log("error" + error);
        }
    }

    async approve() {
        const value_to_approve = BigNumber.from("10").pow(18).mul(100000)
        try {
            return await this.rgldContract.approve(NftAddress, value_to_approve)
        } finally {
            console.log("approved")
        }
    };


    async burnNFT(nft_to_burn) {
        try {
            return await this.nftContract.burnCard(nft_to_burn)
        } catch (error) {
            console.log("error" + error);
        }
        finally {
            console.log("Burned");
        }
    };


    async mintCard(amount) {

        const amount_to_mint = BigNumber.from("10").pow(18).mul(amount)

        try {
            return await this.nftContract.mintCard(amount_to_mint)
        } catch (error) {
            console.log("error" + error);
        } finally {
            console.log("Minted");
        }
    };
}

export default ContractSDK;