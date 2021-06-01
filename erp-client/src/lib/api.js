import axios from "axios";

const server = axios.create({
  baseURL: "http://203.255.176.80:5018/"
});

export const postSampleData = async (formData) => {
  try {
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
    console.log("[SUCCESS] GET generated data");
    return data;
  } catch (e) {
    console.log("[FAIL] GET generated data", e);
    alert("파일 로딩에 실패하였습니다.");
    return null;
  }
};
