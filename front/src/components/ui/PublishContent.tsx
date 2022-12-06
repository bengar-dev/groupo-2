import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { usePostPublication } from "../../hooks/publications/usetPostPublication";
import { handleFileChangeToGetPreview } from "../../misc/handleFilePreview";
import { publishPublicationSchema } from "../../schemas/publications";

export const PublishContent = () => {
  const [togglePublish, setTogglePublish] = useState<boolean>(false);

  const { mutateAsync, isLoading, isError } = usePostPublication();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { content: "", img: "" },
    resolver: yupResolver(publishPublicationSchema),
  });

  const onSubmit = async (data: any, e: any) => {
    // tricky but one way to change our field img to get our file from our form
    if (data.img) {
      data.img = e.target.file.files[0];
    }
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("img", data.img);
    await mutateAsync({
      formData,
    });
    if (!isLoading && !isError) {
      reset();
      setTogglePublish(false);
    }
  };

  const handleToggleToClearPreviewImage = () => {
    /**
     * when we close publication form, we need to reset all fields
     */
    if (togglePublish) {
      reset();
    }
    setTogglePublish(!togglePublish);
  };

  return (
    <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded">
      <Button
        type="button"
        color="gray"
        onClick={() => handleToggleToClearPreviewImage()}
      >
        What's on your mind ?
      </Button>
      {togglePublish && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Content"
                {...field}
                error={Boolean(errors?.content)}
              />
            )}
          />
          <div className="flex justify-center">
            <img
              id="prev-publication"
              src="https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
              alt="preview image"
              className="max-w-full max-h-60 rounded-lg object-cover"
            />
          </div>
          <Controller
            name="img"
            control={control}
            render={({ field }) => (
              <Input
                id="file"
                type="file"
                label="Image"
                {...field}
                onChange={(event) => {
                  field.onChange(event);
                  handleFileChangeToGetPreview("file", "prev-publication");
                }}
              />
            )}
          />
          <Button type="submit" color="green">
            {isLoading ? (
              <div className="flex justify-center">
                <ImSpinner className="animate-spin text-xl text-white" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
