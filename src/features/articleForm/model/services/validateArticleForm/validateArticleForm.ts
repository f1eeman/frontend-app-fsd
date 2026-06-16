export const validateArticleForm = (formData: {
  title: string
}): string | undefined => {
  if (!formData.title.trim()) {
    return 'Заголовок обязателен'
  }
  return undefined
}
