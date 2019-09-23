interface route {
  id: string,
  title: string,
  icon: string,
  path?: string,
  children?: route[]
}

type routes = route[];