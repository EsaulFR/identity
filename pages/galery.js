import { useState } from 'react';

const mockedNFTData = [
  { id: 1, name: 'NFT 1', sharedUntil: '2023-10-20' },
  { id: 2, name: 'NFT 2', sharedUntil: '2023-10-25' },
];

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nftList, setNftList] = useState(mockedNFTData);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Subiendo archivo:', file);
      const newNft = { id: nftList.length + 1, name: file.name, sharedUntil: null };
      setNftList([...nftList, newNft]);
    }
  };

  const handleSharingConfig = (id, date) => {
    console.log(`Configuración de compartir NFT con ID ${id} hasta ${date}`);
    const updatedNftList = nftList.map((nft) =>
      nft.id === id ? { ...nft, sharedUntil: date } : nft
    );
    setNftList(updatedNftList);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Subir Documento</h1>
      <input type="file" onChange={handleFileUpload} className="mb-4" />
      <h2 className="text-2xl font-bold mb-4">Lista de NFTs:</h2>
      <ul>
        {nftList.map((nft) => (
          <li key={nft.id} className="mb-4">
            <span className="font-bold">{nft.name}</span> - Compartir hasta:
            <input
              type="date"
              value={nft.sharedUntil}
              onChange={(e) => handleSharingConfig(nft.id, e.target.value)}
              className="ml-2 p-2 rounded-md border border-gray-300"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}