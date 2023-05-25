import { PostContent } from "@subsocial/api/types"
import { registry } from "./registry"
import { ExtensionSchema, ExtensionWidget } from "./types"
import { EmptyExtension } from "./EmptyExtension"

type ExtendedPostContent = PostContent & {
  extensions?: ExtensionSchema<any>[]
}

function getRegisteredExtension<O extends any>(extension: ExtensionSchema<O>): ExtensionWidget<O> {
  const index = registry.findIndex((v) => v.name == extension.name)
  if (index == -1) return new EmptyExtension({});

  return registry[index]?.initialize(extension.options)
}

function getExtensionsFromPost<O extends any>(post: ExtendedPostContent): ExtensionWidget<O>[] {
  if (!post.extensions) return []

  return post.extensions.map((extension: ExtensionSchema<O>) => getRegisteredExtension(extension))
}

export { getExtensionsFromPost }
