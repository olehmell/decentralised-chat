import { PostContent } from "@subsocial/api/types"
import { ExtensionSchemas, registry } from "./registry"
import { Extension, IExtension } from "./types"
import { EmptyExtension } from "./EmptyExtension"

type ExtendedPostContent = PostContent & {
  extensions?: ExtensionSchemas[]
}

function getRegisteredExtension(extension: Extension): IExtension {
  const index = registry.findIndex((v) => v.schemaName == extension.type)
  if (index == -1) return new EmptyExtension({});

  return registry[index]?.constructor(extension.options)
}

const getExtensionsFromPost = (post: ExtendedPostContent): IExtension[] => {
  if (!post.extensions) return []

  return post.extensions.map((extension: Extension) => getRegisteredExtension(extension))
}

export { getExtensionsFromPost }
