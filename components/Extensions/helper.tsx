import { PostContent } from "@subsocial/api/types"
import { ExtensionSchemas, registry } from "./registry"
import { ExtensionSchema, ExtensionWidget } from "./types"
import { EmptyExtension } from "./EmptyExtension"

type ExtendedPostContent = PostContent & {
  extensions?: ExtensionSchemas[]
}

function getRegisteredExtension(extension: ExtensionSchema): ExtensionWidget {
  const index = registry.findIndex((v) => v.schemaName == extension.name)
  if (index == -1) return new EmptyExtension({});

  return registry[index]?.initialize(extension.options)
}

const getExtensionsFromPost = (post: ExtendedPostContent): ExtensionWidget[] => {
  if (!post.extensions) return []

  return post.extensions.map((extension: ExtensionSchema) => getRegisteredExtension(extension))
}

export { getExtensionsFromPost }
