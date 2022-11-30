import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePostPublication } from "../../hooks/publications/usetPostPublication";
import { publishPublicationSchema } from "../../schemas/publications";

export const PublishContent = () => {
  const [togglePublish, setTogglePublish] = useState<boolean>(false);

  const postPublication = usePostPublication();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

    postPublication.mutate({
      formData,
    });
  };
  return (
    <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded">
      <Button
        type="button"
        color="gray"
        onClick={() => setTogglePublish(!togglePublish)}
      >
        What's on your mind ?
      </Button>
      {togglePublish && (
        <form
          onSubmit={handleSubmit(onSubmit, console.log)}
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
          <Controller
            name="img"
            control={control}
            render={({ field }) => (
              <Input id="file" type="file" label="Image" {...field} />
            )}
          />
          <Button type="submit" color="green">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
