import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { Base_Url } from "../API/Base_Url";
import TopHeader from "../Layout/TopHeader";
import SectionTitle from "../Layout/SectionTitle";

function ProjectList() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${Base_Url}/project`);
            setProjects(res.data.data);
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        try {
            const res = await axios.delete(
                `${Base_Url}/project/${id}`
            );

            toast.success(res.data.message);

            fetchProjects();
        } catch (error) {
            console.log(error)
            toast.error("Delete failed");
        }
    };

    return (
        <>
            <TopHeader />

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <SectionTitle title="Projects List" />

                    <button
                        onClick={() => navigate("/project")}
                        className="bg-[#4a0909] text-white px-5 py-2 rounded"
                    >
                        Add Project
                    </button>

                </div>

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="overflow-x-auto">

                        <table className="w-full border-separate border-spacing-y-2">

                            <thead>

                                <tr className="bg-[#FAFAFA]">

                                    <th className="p-3 text-left">
                                        Image
                                    </th>

                                    <th className="p-3 text-left">
                                        Title
                                    </th>

                                    <th className="p-3 text-left">
                                        Location
                                    </th>

                                    <th className="p-3 text-left">
                                        Area
                                    </th>

                                    <th className="p-3 text-left">
                                        Type
                                    </th>

                                    <th className="p-3 text-left">
                                        RERA
                                    </th>

                                    <th className="p-3 text-left">
                                        Gallery
                                    </th>

                                    <th className="p-3 text-left">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {projects.length > 0 ? (

                                    projects.map((project) => (

                                        <tr
                                            key={project._id}
                                            className="bg-white shadow-sm"
                                        >

                                            <td className="p-3">

                                                <img
                                                    src={project.image}
                                                    alt=""
                                                    className="w-20 h-20 rounded object-cover"
                                                />

                                            </td>

                                            <td className="p-3">
                                                {project.title}
                                            </td>

                                            <td className="p-3">
                                                {project.location}
                                            </td>

                                            <td className="p-3">
                                                {project.area}
                                            </td>

                                            <td className="p-3">
                                                {project.type}
                                            </td>

                                            <td className="p-3">
                                                {project.rera}
                                            </td>

                                            <td className="p-3">

                                                <div className="flex gap-2 flex-wrap">

                                                    {project.gallery?.map(
                                                        (img, index) => (

                                                            <img
                                                                key={index}
                                                                src={img}
                                                                alt=""
                                                                className="w-14 h-14 rounded object-cover"
                                                            />

                                                        )
                                                    )}

                                                </div>

                                            </td>

                                            <td className="p-3">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => navigate(`/project/${project.slug}`)}
                                                        className="bg-green-500 text-white p-2 rounded"
                                                    >
                                                        <MdEdit />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteProject(
                                                                project._id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white p-2 rounded"
                                                    >
                                                        <MdDelete />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={8}
                                            className="text-center py-5"
                                        >
                                            No Projects Found
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ProjectList;