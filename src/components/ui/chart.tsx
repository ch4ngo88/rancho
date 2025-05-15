import * as React from 'react'
import * as Recharts from 'recharts'
import { cn } from '@/lib/utils'

// LegendItem bleibt wie gehabt, weil es nicht direkt von Recharts getypt ist
type LegendItem = {
  value?: string
  color?: string
  dataKey?: string
}

// Sicherer TooltipItem-Typ
interface TooltipItem {
  name?: string
  color?: string
  dataKey?: string | number
  value?: number | string
  payload?: Record<string, unknown>
}

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a <ChartContainer />')
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn('flex aspect-video justify-center text-xs', className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>
          <div>
            {/* Alle Kinder werden hier als ein einziges Element übergeben */}
            {children}
          </div>
        </Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = 'ChartContainer'

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color)

  if (!colorConfig.length) return null

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const lines = colorConfig
        .map(([key, conf]) => {
          const color = conf.theme?.[theme as keyof typeof conf.theme] || conf.color
          return color ? `  --color-${key}: ${color};` : null
        })
        .filter(Boolean)
        .join('\n')

      return `${prefix} [data-chart=${id}] {\n${lines}\n}`
    })
    .join('\n')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

const ChartTooltip = Recharts.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    active?: boolean
    payload?: TooltipItem[]
    label?: string | number
    className?: string
    labelFormatter?: (label: string | number, payload: TooltipItem[]) => React.ReactNode
  }
>(({ active, payload, label, className, labelFormatter }, ref) => {
  const { config } = useChart()

  // Filter valid items
  const validPayload = Array.isArray(payload)
    ? payload.filter((item): item is TooltipItem => !!item)
    : []

  // Return null if not active or payload is empty
  if (!active || !validPayload.length) return null

  // Format label safely
  const formattedLabel =
    typeof label !== 'undefined'
      ? labelFormatter
        ? labelFormatter(label, validPayload)
        : label
      : null

  return (
    <div
      ref={ref}
      className={cn(
        'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {formattedLabel !== null && formattedLabel !== undefined && (
        <div className="font-medium">{formattedLabel}</div>
      )}
      <div className="grid gap-1.5">
        {/* Alle children zu einem einzelnen Container (Fragment oder div) */}
        {validPayload.map((item, index) => {
          const key = item.dataKey?.toString() || item.name?.toString() || `item-${index}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = item.color

          return (
            <div key={key} className="flex items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5">
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between">
                <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {item.value?.toLocaleString?.() ?? item.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = 'ChartTooltipContent'

const ChartLegend = Recharts.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: LegendItem[]
    verticalAlign?: 'top' | 'bottom'
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart()

  const validLegendPayload = Array.isArray(payload)
    ? payload.filter((item): item is LegendItem => !!item)
    : []

  if (!validLegendPayload.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {validLegendPayload.map((item, index) => {
        const key = nameKey || item.dataKey || `item-${index}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value || index}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{itemConfig?.label ?? item.value}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = 'ChartLegendContent'

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
): ChartConfig[string] | undefined {
  const p = {
    ...(payload as object),
    payload: (payload as { payload?: unknown })?.payload ?? {},
  } as {
    [key: string]: unknown
    payload: Record<string, unknown>
  }

  const labelFromDirect = typeof p[key] === 'string' ? (p[key] as string) : undefined

  const labelFromInner =
    typeof p.payload?.[key] === 'string' ? (p.payload[key] as string) : undefined

  const configKey = labelFromDirect || labelFromInner || key
  return config[configKey]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
}
