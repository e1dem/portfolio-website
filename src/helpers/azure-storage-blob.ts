// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const containerName = `pictures`;
const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.REACT_APP_AZURE_STORAGE_RESOURCE_NAME;
// </snippet_package>

// <snippet_get_client>
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
console.log(uploadUrl);

// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(uploadUrl);

// get Container - full public read access
const containerClient: ContainerClient =
  blobService.getContainerClient(containerName);
// </snippet_get_client>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};
// </snippet_isStorageConfigured>

export class BlobItem {
  url: string;
  name: string;

  constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
  }
}

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
export const getBlobsInContainer = async () => {
  const returnedBlobUrls: BlobItem[] = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`${blob.name}`);

    const blobItem = new BlobItem(`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`, blob.name);

    // if image is public, just construct URL
    returnedBlobUrls.push(blobItem);
  }

  return returnedBlobUrls;
};
// </snippet_getBlobsInContainer>

export const getBlobUrl = (name: string) => {
  return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}`;//?${sasToken}`;
}

// <snippet_createBlobInContainer>
const createBlobInContainer = async (file: File) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file: File | null): Promise<void> => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
