const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
}=require("@solana/web3.js");

// Generating a new wallet keypair
const newPair=new Keypair();
console.log(newPair);

// Storing the public and privet key
const publicKey=new PublicKey(newPair._keypair.publicKey).toString();
const secretKey=newPair._keypair.secretKey


// Getting the wallet balance
const getWalletBalance=async () =>
{
    try
    {
        const connection=new Connection(clusterApiUrl("devnet"),"confirmed");
        const myWallet=await Keypair.fromSecretKey(secretKey);
        const walletBalance=await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        )
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`Wallet balance is ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch(err)
    {
        console.log(err);
    }
}

// Airdroping SOLs in terms of LAMPORTS 
const airDropSol=async () =>
{
    try
    {
        const connection=await new Connection(clusterApiUrl("devnet"),"confirmed");
        const walletKeyPair=await Keypair.fromSecretKey(secretKey);
        console.log("--- AirDroping 2 SOL ---");
        const fromAirDropSignature=await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2*LAMPORTS_PER_SOL
        )

        await connection.confirmTransaction(fromAirDropSignature);
    } catch(err)
    {
        console.log(err);
    }
}

// Driver function
const driverFunction=async () =>
{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();