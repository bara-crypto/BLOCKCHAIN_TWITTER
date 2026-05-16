const key = '51a10b4e85c6b128e3bc'
const secret = '46778e341b386c6c351ce1549a892e245011fe6bdd32d8659c9cdf45ebcf2ae7'

import axios from 'axios'


export const pinJSONToIPFS = async (json) =>{
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    return axios.post(url, json, {
        headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,

        }
    }).then((response) => {return response.data.IpfsHash})
    .catch((error) => {console.log(error)});


}


export const pinFileToIPFS = async (file, pinataMetaData) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

  let data = new FormData()

  data.append('file', file)
  data.append('pinataMetadata', JSON.stringify(pinataMetaData))

  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return response.data.IpfsHash
    })
    .catch(function (error) {
      console.log(error)
    })
}

