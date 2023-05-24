import { PostContent } from "@subsocial/api/types"
import { registry } from "./registry";
import { Extension, IExtension } from "./types";
import { EmptyExtension } from "./EmptyExtension";

function getRegisteredExtension(extension: Extension): IExtension | null {
  const index = registry.findIndex((v) => v.schemaName == extension.type)
  if (index == -1) new EmptyExtension({});

  return registry[index]?.constructor(extension.options)
}

const getExtensionsFromPost = (post: PostContent): IExtension[] => {
  const postAny = post as any;
  if (!postAny.extensions) return []

  return postAny.extensions.map((extension: Extension) => {
    const ext = getRegisteredExtension(extension);
    if (!ext) return;

    return ext;
  })
}

export { getExtensionsFromPost }
