import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import databaseService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoadingPage from "../../pages/LoadingPage";

export default function PostForm({ post }) {

    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {

        if (post) {
            setLoading(true)
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

            if (file) {
                databaseService.deleteFile(post.featuredImage);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost?.$id) {
                navigate(`/post/${dbPost.$id}`);
            }
            setLoading(false)
        }

        else {
            setLoading(true)
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;


            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await databaseService.createPost({ ...data, userId: userData?.$id || "" });

                if (dbPost?.$id) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            setLoading(false)
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (loading) {
        <LoadingPage />
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap text-white">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 focus:bg-[#210766] bg-[#210766] text-white border border-gray-400"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 focus:bg-[#210766] bg-[#210766] text-white border border-gray-400"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        const transformedSlug = slugTransform(e.currentTarget.value);
                        setValue("slug", transformedSlug, { shouldValidate: true });
                    }}

                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    size="100px"
                    className="mb-4 
               bg-[#210766] 
               focus:bg-[#210766] 
               text-white 
               border border-gray-400 
               placeholder:bg-[#210766] 
               file:bg-blue-600 
               file:hover:bg-blue-700 
               file:text-white 
               file:border-0 
               file:px-4 
               file:py-2 
               file:rounded 
               file:cursor-pointer"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg focus:bg-[#210766] bg-[#210766] text-white border border-gray-400"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 focus:bg-[#210766] bg-[#210766] text-white border border-gray-400"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}