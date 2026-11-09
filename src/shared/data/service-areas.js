// Location landing pages (WordPress pages, content lives in the CMS).
// Used by the router, the footer "Areas We Serve" band and the location page sidebar.
export const serviceAreas = [
  {
    town: 'Roslyn',
    links: [
      { slug: 'same-day-appointments-roslyn', label: 'Same-Day Appointments' }
    ]
  },
  {
    town: 'Manhasset',
    links: [
      { slug: 'same-day-appointments-manhasset', label: 'Same-Day Appointments' },
      { slug: 'multilingual-orthodontist-manhasset', label: 'Multilingual Care' }
    ]
  },
  {
    town: 'Port Washington',
    links: [
      { slug: 'same-day-appointments-port-washington', label: 'Same-Day Appointments' }
    ]
  },
  {
    town: 'Great Neck',
    links: [
      { slug: 'multilingual-orthodontist-great-neck', label: 'Multilingual Care' }
    ]
  }
]

export const locationSlugs = serviceAreas.reduce(
  (all, area) => all.concat(area.links.map(link => link.slug)),
  []
)
