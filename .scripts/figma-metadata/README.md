# Figma icon metadata

Fuente: [libreria-Iconos](https://www.figma.com/design/u1kcWn7lev6qcjJnUSbOMk/libreria-Iconos) (`u1kcWn7lev6qcjJnUSbOMk`)

| Archivo | Página Figma | Node página |
|---------|--------------|-------------|
| `iconsax-outline.xml` | iconsax-outline | `0:1` |
| `iconsax-bold.xml` | iconsax-bold | `1586:26` |
| `tabler.xml` | tablericons | `1586:28` |
| `lucide.xml` | lucide | `1586:27` |

## Actualizar metadata desde Figma MCP

En Cursor, con el MCP de Figma conectado, ejecutar `get_metadata` por página y guardar el XML en estos archivos.

## Comandos

```bash
# Regenerar catálogo + registries (sin token)
yarn sync:icons:manifest

# Exportar SVGs (requiere token)
set FIGMA_ACCESS_TOKEN=figd_...
yarn sync:icons:export

# Flujo completo
yarn sync:icons
```
