// Builds the six CRUD handlers every collection needs, so each resource
// controller stays small and consistent.
export default function crudController(Model, label) {
  const handle = (fn) => async (req, res) => {
    try {
      await fn(req, res)
    } catch (err) {
      const status = err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500
      res.status(status).json({ message: err.message })
    }
  }
  const notFound = (res) => res.status(404).json({ message: `${label} not found` })

  return {
    list: handle(async (req, res) => res.json(await Model.find().sort({ _id: -1 }))),
    read: handle(async (req, res) => {
      const doc = await Model.findById(req.params.id)
      doc ? res.json(doc) : notFound(res)
    }),
    create: handle(async (req, res) => res.status(201).json(await Model.create(req.body))),
    update: handle(async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      doc ? res.json(doc) : notFound(res)
    }),
    remove: handle(async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id)
      doc ? res.json(doc) : notFound(res)
    }),
    removeAll: handle(async (req, res) => {
      const result = await Model.deleteMany({})
      res.json({ message: `${result.deletedCount} ${label}(s) removed` })
    })
  }
}
