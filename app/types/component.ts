export const componentAreas = ['MOT', 'TCO', 'beOne', 'Jobs', 'Corporate'] as const
export type ComponentArea = (typeof componentAreas)[number]

export const componentStatuses = ['toProcess', 'inProgress', 'inReview', 'done'] as const
export type ComponentStatus = (typeof componentStatuses)[number]

export type ComponentCard = {
  id: string
  name: string
  category: string
  storybookPath: string
  filePath: string
  areas: ComponentArea[]
  status: ComponentStatus
}

export type ComponentInventoryItem = {
  name: string
  category: string
  storybookPath: string
  filePath: string
}

