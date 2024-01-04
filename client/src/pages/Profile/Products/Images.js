import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { UploadProductImage } from "../../../apicalls/product";

function Images({ selectedProduct, getData, setShowProductForm }) {
  const [showPreview, setShowPreview] = useState(true);
  const [images, setImages] = useState(selectedProduct.images);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  async function upload() {
    try {
      dispatch(SetLoader(true));
      //upload image to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.messsage);
    }
  }
  return (
    <div>
      <div className="flex mb-5 gap-5">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500  p-5 rounded items-end">
              <img className="h-20 w-20 object-cover" src={image} alt="img" />
              <i
                className="ri-delete-bin-line text-2xl cursor-pointer"
                onClick={() => {}}
              ></i>
            </div>
          );
        })}
      </div>

      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
        // onChange={(info) => setFile((pre) => [...pre, info.file])}
      >
        <Button type="dashed">Upload image</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-3">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;
