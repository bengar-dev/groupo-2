export function handleFileChangeToGetPreview(
  fileInputId: string,
  divImagePreviewId: string
) {
  const fileReader = new FileReader();
  const inputFile = document.getElementById(fileInputId) as HTMLInputElement;
  if (inputFile && inputFile.files) {
    fileReader.readAsDataURL(inputFile.files[0]);
    fileReader.onload = () => {
      const divImagePreview = document.getElementById(divImagePreviewId);
      if (divImagePreview) {
        divImagePreview.setAttribute("src", fileReader.result as string);
      }
    };
  }
}
