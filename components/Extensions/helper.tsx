import { PostContent } from "@subsocial/api/types"
<<<<<<< HEAD:components/Extensions/helper.tsx
import { registry } from "./registry";
import { Extension, IExtension } from "./types";
import { EmptyExtension } from "./EmptyExtension";
=======
import { ExtensionSchemas, registry } from "./registry"
import { Extension, IExtension } from "./types"
import { EmptyExtension } from "./EmptyExtension"
>>>>>>> main:components/Extension/helper.tsx

type ExtendedPostContent = PostContent & {
  extensions?: ExtensionSchemas[]
}

function getRegisteredExtension(extension: Extension): IExtension {
  const index = registry.findIndex((v) => v.schemaName == extension.type)
<<<<<<< HEAD:components/Extensions/helper.tsx
  if (index == -1) new EmptyExtension({});
=======
  if (index == -1) return new EmptyExtension({});
>>>>>>> main:components/Extension/helper.tsx

  return registry[index]?.constructor(extension.options)
}

const getExtensionsFromPost = (post: ExtendedPostContent): IExtension[] => {
  if (!post.extensions) return []

  return post.extensions.map((extension: Extension) => getRegisteredExtension(extension))
}

export { getExtensionsFromPost }
