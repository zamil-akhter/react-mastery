import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealTimeEditor, Select } from "..";
import appwriteService from "../../appwright/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  const submitPost = async (data) => {
    if (post) {
      console.log("data to update :", data);
      const file = data?.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      console.log("data to add :", data);
      const file = await appwriteService.uploadFile(data?.image[0]);

      console.log("file uploaded :", file);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        console.log("data to add :", data);
       try {
         const dbPost = await appwriteService.createPost({
           ...data,
           userId: userData.$id,
         });

         if (dbPost) {
           navigate(`/post/${dbPost.$id}`);
         }
       } catch (error) {
         // DB post creation failed
         console.log("Post creation failed. Deleting uploaded file:", fileId);
         try {
           await appwriteService.deleteFile(fileId);
         } catch (deleteError) {
           console.error("Failed to delete uploaded file:", deleteError);
         }
       }
      }
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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap -mx-3">
      <div className="w-full lg:w-2/3 px-3 mb-6 lg:mb-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <Input
            label="Title :"
            placeholder="Enter post title"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="post-slug"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RealTimeEditor
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/3 px-3">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <Input
            label="Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-emerald-600 hover:bg-emerald-700" : undefined}
            className="w-full mt-2"
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
