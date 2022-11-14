<script>
  import CardList from "./cards.svelte";
  import Card from "./lib/components/card.svelte";
  import { BigNumber } from "ethers";

  let basics;
  let holos;
  let galaxies;
  let radiant;
  let basicGallery;
  let vee;
  let veeUltra;
  let veeAlt;
  let veeMax;
  let veeMaxAlt;
  let veeStar;
  let trainerHolo;
  let rainbow;
  let gold;
  let veeGallery;

  let cube_gold = 1001;
  let nft_to_burn = 0;

  let gold_balance = 0;

  const NftContractAddress = "TSXNN3fFvM5jvQ28HVzMHfrLCsUjDBfgVG";

  const getBalance = async () => {};

  const getCards = async () => {
    let promiseArray = [];

    let cardFetch = await fetch("/data.json");
    let cards = await cardFetch.json();
    // window.cards = cards;

    basics = cards.slice(0, 3);
    holos = cards.slice(6, 12);
    galaxies = cards.slice(12, 15);
    radiant = cards.slice(15, 18);
    basicGallery = cards.slice(60, 63);
    vee = cards.slice(18, 21);
    veeUltra = cards.slice(21, 24);
    veeAlt = [...cards.slice(27, 30), ...cards.slice(33, 36)];
    veeMax = cards.slice(24, 27);
    veeMaxAlt = [cards[36], cards[31], cards[37]];
    veeStar = cards.slice(39, 42);
    trainerHolo = cards.slice(42, 48);
    rainbow = cards.slice(48, 51);
    gold = cards.slice(51, 54);
    veeGallery = cards.slice(63, 69);

    return cards;
  };

  const mintCard = async (amount) => {
    console.log(amount);
    const HexNftContractAddress =
      window.tronWeb.address.toHex(NftContractAddress);

    console.log(HexNftContractAddress);
    console.log(window.tronWeb.address.fromHex(HexNftContractAddress));

    const transaction =
      await window.tronWeb.transactionBuilder.triggerSmartContract(
        HexNftContractAddress,
        "mintCard(uint256)",
        {},
        [
          {
            type: "uint256",
            value: BigNumber.from("10").pow(18).mul(amount),
          },
        ],
        window.tronWeb.address.toHex(window.tronWeb.defaultAddress.base58)
      );

    const signedTransaction = await window.tronWeb.trx.sign(
      transaction.transaction
    );

    const result = await window.tronWeb.trx.sendRawTransaction(
      signedTransaction
    );

    console.log(result);
  };

  const burnNFT = async (nft_to_burn) => {
    const HexNftContractAddress =
      window.tronWeb.address.toHex(NftContractAddress);

    console.log(HexNftContractAddress);
    console.log(window.tronWeb.address.fromHex(HexNftContractAddress));

    const transaction =
      await window.tronWeb.transactionBuilder.triggerSmartContract(
        HexNftContractAddress,
        "burnCard(uint256)",
        {},
        [
          {
            type: "uint256",
            value: nft_to_burn,
          },
        ],
        window.tronWeb.address.toHex(window.tronWeb.defaultAddress.base58)
      );

    const signedTransaction = await window.tronWeb.trx.sign(
      transaction.transaction
    );

    const result = await window.tronWeb.trx.sendRawTransaction(
      signedTransaction
    );

    console.log(result);
  };

  const approve = async () => {
    const HexNftContractAddress =
      window.tronWeb.address.toHex(NftContractAddress);

    const HexGOLDContractAddress = window.tronWeb.address.toHex(
      "TJ9acewm9Li9utY6GxK7e4qDvaRMY72uGk"
    );

    const transaction =
      await window.tronWeb.transactionBuilder.triggerSmartContract(
        HexGOLDContractAddress,
        "approve(address,uint256)",
        {},
        [
          {
            type: "address",
            value: HexNftContractAddress,
          },
          {
            type: "uint256",
            value: BigNumber.from("10").pow(18).mul(100000),
          },
        ],
        window.tronWeb.address.toHex(window.tronWeb.defaultAddress.base58)
      );

    const signedTransaction = await window.tronWeb.trx.sign(
      transaction.transaction
    );

    const result = await window.tronWeb.trx.sendRawTransaction(
      signedTransaction
    );

    console.log(result);
  };
</script>

<main>
  <header>
    <h1>Real Fake Synergy NFTs</h1>

    <section class="intro">
      <p>
        Mint <mark>memorable NFTs</mark> from Synergy synths!
        <br />
        You will be able to <mark>redeem your synths</mark> by smelting the NFT.
      </p>
      <br />
      <p>
        Mining natural resources hurts the environment. That's why we decided to
        create Synergy — a synthetic assets protocol with cutting-edge DeFi
        maths.
      </p>
      <br />
      <p>
        A large part of mining is powered by <mark
          >the need for speculation</mark
        >. By making speculators trade synths instead of the real thing, we can
        offset real-world resource mining.
      </p>
      <br />
      <p>
        Another big part of mining natural resources is creating jewelry. But
        now you can <mark>create jewelry with synthetic gold!</mark>
      </p>
    </section>

    <div class="showcase">
      {#await getCards()}
        loading...
      {:then cards}
        <Card
          name={cards[51].name}
          img={cards[51].images.large}
          number={cards[51].number}
          supertype={cards[51].supertype}
          subtypes={cards[51].subtypes}
          rarity={cards[51].rarity}
          showcase={true}
        />
      {/await}

      <div>
        <div class="mint-cube-block">
          <div class="input-burn">
            <input
              class="mint-button cube cube-input"
              type="number"
              bind:value={cube_gold}
            />
            Select Cube weight in oz ( >= 1000 )
          </div>
          <button
            class="mint-button cube mint-cube"
            on:click={() => mintCard(cube_gold)}>Mint Cube</button
          >
          <!-- <button class="mint-button cube" on:click={() => approve()}
            >Approve</button
          > -->
        </div>
      </div>
    </div>

    <section class="info">
      <h2><em>(Click a card to take a closer look at it!)</em></h2>

      <hr />

      <div>
        <button class="mint-button cube approve" on:click={() => approve()}
          >Approve rGLD before mint NFT</button
        >
      </div>
    </section>
  </header>

  <h1>Precious Collectibles</h1>
  <p>
    We will create <mark>seasonal collections</mark> and
    <mark>community drops</mark>
    that will have special rarity effects.
    <br />
    Some of them you can only mint within a specific timeframe.
  </p>
  <br />
  <p>Right now you can mint:</p>
  <ul>
    <li>A 1oz Gold Coin — The best non-fungible fungible currency.</li>
    <li>A 5oz Gold Nugget — A rocky boy.</li>
    <li>A 10oz Gold Ingot — I can't believe it's not butter.</li>
    <li>
      A Cube of pure gold — For 1000oz or more, you can show that you're the
      biggest nature lover. <s>You can touch it</s> It looks nice.
    </li>
  </ul>
  <CardList>
    {#await getCards()}
      loading...
    {:then cards}
      {#each vee as card, id}
        <Card
          name={card.name}
          img={card.images.large}
          number={card.number}
          supertype={card.supertype}
          subtypes={card.subtypes}
          rarity={card.rarity}
        />
      {/each}
    {/await}
  </CardList>

  <div class="mint-block">
    <div>
      <p class="mint-button" on:click={() => mintCard(1)}>Mint Coin</p>
    </div>
    <div>
      <p class="mint-button" on:click={() => mintCard(3)}>Mint Nugget</p>
    </div>
    <div>
      <p class="mint-button" on:click={() => mintCard(5)}>Mint Ingot</p>
    </div>
  </div>

  <div class="burn-btn">
    <button class="mint-button" on:click={() => burnNFT(nft_to_burn)}
      >Burn NFT</button
    >
    <div class="input-burn">
      <input
        type="number"
        bind:value={nft_to_burn}
        class=" mint-button cube-input"
      />
      Select ID of your NFT to burn
    </div>
    <!-- <input
      type="number"
      bind:value={nft_to_burn}
      class=" mint-button cube-input"
    />
    Select ID of your NFT to burn -->
  </div>

  <p class="small">
    Artwork generated by Stable Diffusion and
    <a href="https://github.com/simeydotme/pokemon-cards-css"
      >pokemon-cards-css</a
    >
  </p>
</main>

<style>
  .cube {
    width: 100%;
  }

  .mint-cube-block {
    margin-top: 15px;
  }

  .mint-block {
    margin-top: 20px;
    display: flex;
    margin-bottom: 30px;
    justify-content: space-around;
  }

  .mint-button {
    background-color: rgb(31, 30, 28);
    min-width: 300px;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;

    border-radius: 6px;

    border: 2px solid #ffb403;
  }

  .cube-input {
    background-color: white;
    color: black;
  }

  main {
    color: white;
    padding: 50px;
    max-width: 1200px;
    margin: auto;
  }

  header {
    margin-bottom: 4rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    max-width: 900px;
    margin: auto;
  }

  header h2 {
    margin-top: 0;
    font-weight: 100;
  }

  header svg {
    width: 1em;
    fill: currentColor;
    position: relative;
    top: 2px;
    margin: 0 5px;
    display: inline-block;
  }

  .burn-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .burn-btn button {
    margin-right: 20px;
  }

  .approve {
    margin-top: 15px;
  }

  .input-burn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mint-cube {
    margin-top: 10px;
  }

  @media screen and (min-width: 600px) {
    header {
      grid-template-columns: 50% 1fr;
    }
    .showcase {
      grid-column: 2;
      grid-row: 1/5;
    }
    .intro,
    .info,
    .author {
      grid-column: 1;
    }
  }

  @media screen and (min-width: 900px) {
    header {
      grid-template-columns: 60% 1fr;
    }
  }

  .showcase {
    z-index: 99;
    max-width: min(330px, 80vw);
    margin: auto;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0.25em;
  }

  p {
    margin: 0 0 0.25em;
    line-height: 1.5;
  }

  p.small {
    font-size: 0.875rem;
    opacity: 0.75;
  }

  h1,
  h2,
  h3 {
    font-family: "Roboto Condensed";
  }

  h2 {
    margin-top: 4em;
    margin-bottom: 0.25em;
  }

  h2 + p,
  h2 + p + p {
    font-style: italic;
    margin-bottom: 1em;
  }

  hr {
    border: none;
    background: white;
    height: 1px;
    opacity: 0.25;
    margin: 1em -1em;
  }

  h1 sup {
    font-weight: 300;
    font-size: 0.5em;
  }

  h2 sup {
    font-weight: 300;
    font-size: 0.75em;
  }

  mark {
    background: #ffb403;
    color: black;
    font-style: italic;
    font-weight: bold;
    padding-inline: 0.25em;
    border-radius: 3px;
  }
</style>
