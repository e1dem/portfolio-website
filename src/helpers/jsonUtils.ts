const idRemover = (key: string, value: any) => {
  if (key === "id")
    return undefined;

    return value;
}

export default idRemover;