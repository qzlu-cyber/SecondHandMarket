import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const getListingsByUserid = (id) =>
  client.get(`${endpoint}/getUserListings/${id}`);

const getListingsBySearch = (title) =>
  client.post(`${endpoint}/getListingsBySearch`, title);

export const addListing = async (listing, onUploadProgress) => {
  const data = {};
  const array = [];
  // for (let i = 0; i < listing.images.length; i++) {
  //   let imagesData = {
  //     url: "",
  //   };
  //   imagesData.url = listing.images[i];
  //   array.push(imagesData);
  // }
  data.id = listing.id;
  data.title = listing.title;
  data.price = listing.price;
  data.images = listing.images;
  data.description = listing.description;

  if (listing.location) data.location = JSON.stringify(listing.location);

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const update = (id) => client.put(`${endpoint}/saleOut/${id}`);

export default {
  addListing,
  getListings,
  getListingsByUserid,
  getListingsBySearch,
  update,
};