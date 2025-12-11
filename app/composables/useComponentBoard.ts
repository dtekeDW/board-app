import type { ComponentArea, ComponentCard, ComponentStatus } from '~/types/component'
import { computed, reactive, ref } from 'vue'
import { componentInventory } from '~/data/componentInventory'
import { componentStatuses } from '~/types/component'

interface SprintOption {
  id: string
  name: string
}

const statusCycle: ComponentStatus[] = ['toProcess', 'inProgress', 'inReview', 'done']
const areaCycle: ComponentArea[][] = [
  ['MOT'],
  ['TCO', 'Corporate'],
  ['beOne'],
  ['Jobs'],
  ['Corporate', 'MOT'],
  ['MOT', 'Jobs'],
  ['TCO'],
  ['Jobs', 'Corporate'],
]

function buildCards(): ComponentCard[] {
  return componentInventory.map((item, index) => ({
    id: `component-${index + 1}`,
    name: item.name,
    category: item.category,
    storybookPath: item.storybookPath,
    filePath: item.filePath,
    status: statusCycle[index % statusCycle.length],
    areas: areaCycle[index % areaCycle.length],
  }))
}

export function useComponentBoard() {
  const cards = reactive<ComponentCard[]>(buildCards())
  const selectedCardId = ref<string | null>(null)
  const sprint = ref<SprintOption>({ id: 'sprint-89-1', name: 'Sprint 89.1' })
  const sprintOptions: SprintOption[] = [
    { id: 'sprint-89-1', name: 'Sprint 89.1' },
    { id: 'sprint-90-1', name: 'Sprint 90.1' },
    { id: 'sprint-90-2', name: 'Sprint 90.2' },
  ]

  const cardsByStatus = computed<Record<ComponentStatus, ComponentCard[]>>(() =>
    componentStatuses.reduce(
      (acc, status) => ({
        ...acc,
        [status]: cards.filter(card => card.status === status),
      }),
      {
        toProcess: [] as ComponentCard[],
        inProgress: [] as ComponentCard[],
        inReview: [] as ComponentCard[],
        done: [] as ComponentCard[],
      },
    ),
  )

  const moveCard = (id: string, status: ComponentStatus) => {
    const card = cards.find(item => item.id === id)
    if (card)
      card.status = status
  }

  const updateAreas = (id: string, areas: ComponentArea[]) => {
    const card = cards.find(item => item.id === id)
    if (card)
      card.areas = [...areas]
  }

  const selectCard = (id: string | null) => {
    selectedCardId.value = id
  }

  const selectedCard = computed<ComponentCard | null>(
    () => cards.find(card => card.id === selectedCardId.value) ?? null,
  )

  const columns = computed<
    { key: ComponentStatus, title: string, cards: ComponentCard[] }[]
  >(() => [
    { key: 'toProcess', title: 'To Process', cards: cardsByStatus.value.toProcess },
    { key: 'inProgress', title: 'In Progress', cards: cardsByStatus.value.inProgress },
    { key: 'inReview', title: 'In Review', cards: cardsByStatus.value.inReview },
    { key: 'done', title: 'Done', cards: cardsByStatus.value.done },
  ])

  return {
    sprint,
    sprintOptions,
    cards,
    columns,
    selectedCard,
    moveCard,
    updateAreas,
    selectCard,
  }
}
