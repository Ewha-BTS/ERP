import axios from "axios";

// const server = axios.create({
//   baseURL: "http://203.255.176.80:5016",
//   timeout: 1000
// });

const server = axios.create({
  baseURL: "http://203.255.176.80:5018/",
  timeout: 1000
});

export const postSampleData = async (formData) => {
  try {
    console.log("data", formData);
    const data = await server.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log("[SUCCESS] POST sample data");
    return data;
  } catch (e) {
    console.log("[FAIL] POST sample data", e);
    alert("파일 로딩에 실패하였습니다.");
    return null;
  }
};

export const loadGeneratedData = async (id) => {
  try {
    const data = await server.get(`/inference/${id}`);
    console.log(data);
    console.log("[SUCCESS] GET near card data");
    return data;
  } catch (e) {
    console.log("[FAIL] GET load sample data");
    return null;
  }
};
