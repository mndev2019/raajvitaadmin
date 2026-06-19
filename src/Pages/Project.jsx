// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Base_Url } from "../API/Base_Url";
// import TopHeader from "../Layout/TopHeader";
// import SectionTitle from "../Layout/SectionTitle";
// import { MdDelete } from "react-icons/md";

// function Project() {
//   const [loading, setLoading] = useState(false);
//   const [projects, setProjects] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     area: "",
//     type: "",
//     rera: "",
//     description: "",
//     features: "",
//   });

//   const [image, setImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);

//   // Fetch Projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(`${Base_Url}/project`);
//       setProjects(res.data.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch projects");
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Handle Inputs
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Main Image
//   const handleImage = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error("Image size must be less than 10MB");
//       e.target.value = "";
//       return;
//     }

//     setImage(file);
//   };

//   // Gallery Images
//   const handleGalleryImages = (e) => {
//     const files = Array.from(e.target.files);

//     for (const file of files) {
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error(`${file.name} exceeds 10MB`);
//         return;
//       }
//     }

//     setGalleryImages(files);
//   };

//   // Create Project
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       return toast.error("Please select main image");
//     }

//     try {
//       setLoading(true);

//       const data = new FormData();

//       data.append("title", formData.title);
//       data.append("location", formData.location);
//       data.append("area", formData.area);
//       data.append("type", formData.type);
//       data.append("rera", formData.rera);
//       data.append("description", formData.description);

//       data.append(
//         "features",
//         JSON.stringify(
//           formData.features
//             .split(",")
//             .map((item) => item.trim())
//             .filter(Boolean)
//         )
//       );

//       // Main Image
//       data.append("image", image);

//       // Gallery Images
//       galleryImages.forEach((file) => {
//         data.append("gallery", file);
//       });

//       const res = await axios.post(
//         `${Base_Url}/project`,
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success(res.data.message);

//       setFormData({
//         title: "",
//         location: "",
//         area: "",
//         type: "",
//         rera: "",
//         description: "",
//         features: "",
//       });

//       setImage(null);
//       setGalleryImages([]);

//       document.getElementById("project-image").value = "";
//       document.getElementById("gallery-images").value = "";

//       fetchProjects();
//     } catch (error) {
//       console.log(error);

//       toast.error(
//         error?.response?.data?.message ||
//         "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Project
//   const deleteProject = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this project?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const res = await axios.delete(
//         `${Base_Url}/project/${id}`
//       );

//       toast.success(
//         res.data.message || "Project deleted"
//       );

//       fetchProjects();
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to delete project");
//     }
//   };

//   return (
//     <>
//       <TopHeader />

//       <div className="p-6">
//         <SectionTitle title="Project Management" />

//         {/* Form */}
//         <div className="bg-white rounded-xl shadow p-6 mb-8">
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             <input
//               type="text"
//               name="title"
//               placeholder="Project Title"
//               value={formData.title}
//               onChange={handleChange}
//               className="border border-[#3c0d12] p-3 rounded"
//               required
//             />

//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.location}
//               onChange={handleChange}
//               className="border border-[#3c0d12] p-3 rounded"
//               required
//             />

//             <input
//               type="text"
//               name="area"
//               placeholder="Area"
//               value={formData.area}
//               onChange={handleChange}
//               className="border border-[#3c0d12] p-3 rounded"
//               required
//             />

//             <input
//               type="text"
//               name="type"
//               placeholder="Project Type"
//               value={formData.type}
//               onChange={handleChange}
//               className="border border-[#3c0d12] p-3 rounded"
//               required
//             />

//             <input
//               type="text"
//               name="rera"
//               placeholder="RERA Number"
//               value={formData.rera}
//               onChange={handleChange}
//               className="border border-[#3c0d12] p-3 rounded"
//               required
//             />

//             <input
//               type="text"
//               name="features"
//               placeholder="Features (comma separated)"
//               value={formData.features}
//               onChange={handleChange}
//               className="border border-[#3c0d12] p-3 rounded"
//             />

//             <div className="md:col-span-2">
//               <textarea
//                 rows="5"
//                 name="description"
//                 placeholder="Project Description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="border border-[#3c0d12] p-3 rounded w-full"
//                 required
//               />
//             </div>

//             {/* Main Image */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 font-medium">
//                 Main Image (Max 10MB)
//               </label>

//               <input
//                 id="project-image"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImage}
//                 className="border border-[#3c0d12] p-3 rounded w-full"
//                 required
//               />

//               {image && (
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt="preview"
//                   className="w-32 h-32 object-cover rounded mt-3"
//                 />
//               )}
//             </div>

//             {/* Gallery Images */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 font-medium">
//                 Gallery Images (Multiple)
//               </label>

//               <input
//                 id="gallery-images"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleGalleryImages}
//                 className="border border-[#3c0d12] p-3 rounded w-full"
//               />

//               {galleryImages.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
//                   {galleryImages.map((file, index) => (
//                     <img
//                       key={index}
//                       src={URL.createObjectURL(file)}
//                       alt=""
//                       className="h-24 w-full object-cover rounded"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-[#4a0909] text-white px-6 py-3 rounded"
//               >
//                 {loading
//                   ? "Uploading..."
//                   : "Create Project"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Projects Table */}
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="text-2xl font-bold mb-6">
//             Projects List
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="w-full border-separate border-spacing-y-2">
//               <thead>
//                 <tr className="bg-[#FAFAFA] text-sm font-semibold">
//                   <th className="p-3 text-left">Image</th>
//                   <th className="p-3 text-left">Title</th>
//                   <th className="p-3 text-left">Location</th>
//                   <th className="p-3 text-left">Area</th>
//                   <th className="p-3 text-left">Type</th>
//                   <th className="p-3 text-left">RERA</th>
//                   <th className="p-3 text-left">Gallery</th>
//                   <th className="p-3 text-left">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {projects.length > 0 ? (
//                   projects.map((project) => (
//                     <tr key={project._id} className="bg-white shadow-sm rounded">
//                       <td className="p-3">
//                         <img
//                           src={project.image}
//                           alt={project.title}
//                           className="w-20 h-20 object-cover rounded"
//                         />
//                       </td>

//                       <td className="p-3">
//                         {project.title}
//                       </td>

//                       <td className="p-3">
//                         {project.location}
//                       </td>

//                       <td className="p-3">
//                         {project.area}
//                       </td>

//                       <td className="p-3">
//                         {project.type}
//                       </td>

//                       <td className="p-3">
//                         {project.rera}
//                       </td>



//                       <td className="p-3">
//                         <div className="flex gap-2 flex-wrap">
//                           {project.gallery?.length > 0 ? (
//                             project.gallery.map((img, index) => (
//                               <img
//                                 key={index}
//                                 src={img}
//                                 alt=""
//                                 className="w-14 h-14 object-cover rounded"
//                               />
//                             ))
//                           ) : (
//                             <span>No Images</span>
//                           )}
//                         </div>
//                       </td>

//                       <td className="p-3">
//                         <button
//                           onClick={() =>
//                             deleteProject(project._id)
//                           }
//                           className="bg-red-500 text-white px-4 py-2 rounded"
//                         >
//                           <MdDelete />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="9"
//                       className="text-center py-6 text-gray-500"
//                     >
//                       No Projects Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Project;




import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Base_Url } from "../API/Base_Url";
import TopHeader from "../Layout/TopHeader";
import SectionTitle from "../Layout/SectionTitle";

function Project() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const isEdit = !!slug;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    area: "",
    type: "",
    rera: "",
    description: "",
    features: "",
  });

  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [oldImage, setOldImage] = useState("");
  const [oldGallery, setOldGallery] = useState([]);

  // ======================
  // Fetch Single Project
  // ======================



const fetchProject = async () => {
  const res = await axios.get(
    `${Base_Url}/project/${slug}`
  );

  const data = res.data.data;

  setFormData({
    title: data.title,
    location: data.location,
    area: data.area,
    type: data.type,
    rera: data.rera,
    description: data.description,
    features: data.features.join(", "),
  });

  setOldImage(data.image);
  setOldGallery(data.gallery);
};

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [slug]);

  // ======================
  // Handle Inputs
  // ======================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // Main Image
  // ======================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setImage(file);
  };

  // ======================
  // Gallery Images
  // ======================

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB`);
        return;
      }
    }

    setGalleryImages(files);
  };

  // ======================
  // Submit
  // ======================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit && !image) {
      return toast.error("Please select main image");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("area", formData.area);
      data.append("type", formData.type);
      data.append("rera", formData.rera);
      data.append("description", formData.description);

      data.append(
        "features",
        JSON.stringify(
          formData.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      if (image) {
        data.append("image", image);
      }

      galleryImages.forEach((img) => {
        data.append("gallery", img);
      });

      if (isEdit) {
        await axios.put(
          `${Base_Url}/project/${slug}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Project Updated Successfully");
      } else {
        await axios.post(
          `${Base_Url}/project`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Project Created Successfully");
      }

      navigate("/project-list");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader />

      <div className="p-6">
        <div className="flex justify-between">
          <SectionTitle
            title={isEdit ? "Update Project" : "Project Management"}
          />
          <button
            type="submit"
            onClick={() => navigate('/project-list')}

            className="bg-[#4a0909] text-white px-6 py-3 rounded"
          >
            View Project
          </button>


        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-[#3c0d12] p-3 rounded"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border border-[#3c0d12] p-3 rounded"
              required
            />

            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="border border-[#3c0d12] p-3 rounded"
              required
            />

            <input
              type="text"
              name="type"
              placeholder="Project Type"
              value={formData.type}
              onChange={handleChange}
              className="border border-[#3c0d12] p-3 rounded"
              required
            />

            <input
              type="text"
              name="rera"
              placeholder="RERA Number"
              value={formData.rera}
              onChange={handleChange}
              className="border border-[#3c0d12] p-3 rounded"
              required
            />

            <input
              type="text"
              name="features"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={handleChange}
              className="border border-[#3c0d12] p-3 rounded"
            />

            <div className="md:col-span-2">
              <textarea
                rows="5"
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="border border-[#3c0d12] p-3 rounded w-full"
                required
              />
            </div>

            {/* Main Image */}

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Main Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="border border-[#3c0d12] p-3 rounded w-full"
              />

              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-36 h-36 object-cover rounded mt-3"
                />
              ) : oldImage ? (
                <img
                  src={oldImage}
                  alt=""
                  className="w-36 h-36 object-cover rounded mt-3"
                />
              ) : null}
            </div>

            {/* Gallery */}

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Gallery Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryImages}
                className="border border-[#3c0d12] p-3 rounded w-full"
              />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                {oldGallery?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover rounded"
                  />
                ))}

                {galleryImages?.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="h-24 w-full object-cover rounded border-2 border-green-500"
                  />
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4a0909] text-white px-6 py-3 rounded"
              >
                {loading
                  ? isEdit
                    ? "Updating..."
                    : "Uploading..."
                  : isEdit
                    ? "Update Project"
                    : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

}

export default Project;