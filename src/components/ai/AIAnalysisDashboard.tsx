import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield,
  Activity,
  Users,
  Wallet,
  BarChart3,
  Eye,
  Zap,
  Search,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface TokenHealth {
  symbol: string
  name: string
  health: number
  risk: 'low' | 'medium' | 'high' | 'critical'
  volumeChange: number
  holderConcentration: number
  whaleActivity: number
  socialScore: number
  rugProbability: number
}

const mockTokens: TokenHealth[] = [
  { symbol: 'PEPE', name: 'Pepe', health: 85, risk: 'low', volumeChange: 12.4, holderConcentration: 15, whaleActivity: 8, socialScore: 92, rugProbability: 5 },
  { symbol: 'BONK', name: 'Bonk', health: 72, risk: 'medium', volumeChange: -8.2, holderConcentration: 28, whaleActivity: 45, socialScore: 78, rugProbability: 18 },
  { symbol: 'WIF', name: 'dogwifhat', health: 91, risk: 'low', volumeChange: 25.6, holderConcentration: 12, whaleActivity: 15, socialScore: 95, rugProbability: 3 },
  { symbol: 'BOME', name: 'Book of Meme', health: 45, risk: 'high', volumeChange: -52.3, holderConcentration: 65, whaleActivity: 82, socialScore: 42, rugProbability: 72 },
  { symbol: 'MYRO', name: 'Myro', health: 58, risk: 'medium', volumeChange: -15.8, holderConcentration: 35, whaleActivity: 55, socialScore: 65, rugProbability: 35 },
  { symbol: 'POPCAT', name: 'Popcat', health: 78, risk: 'low', volumeChange: 5.2, holderConcentration: 22, whaleActivity: 12, socialScore: 88, rugProbability: 8 },
]

const riskAlerts = [
  { token: 'BOME', type: 'volume', message: 'Volume dropped 52% in 24h', severity: 'critical' },
  { token: 'BONK', type: 'whale', message: 'Large wallet moved 45M tokens', severity: 'warning' },
  { token: 'MYRO', type: 'holder', message: 'Top 10 holders own 35% of supply', severity: 'warning' },
]

export function AIAnalysisDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedToken, setSelectedToken] = useState<TokenHealth | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const filteredTokens = mockTokens.filter(t => 
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const analyzeToken = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success bg-success/10 border-success/30'
      case 'medium': return 'text-warning bg-warning/10 border-warning/30'
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30'
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/30'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">AI Token Scanner</h1>
          <p className="text-muted-foreground mt-1">Real-time death spiral & rug pull prevention</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Brain className="w-4 h-4 text-primary" />
            ML Models Active
          </Badge>
          <Button variant="outline" size="sm" onClick={analyzeToken} disabled={isAnalyzing}>
            <RefreshCw className={cn("w-4 h-4 mr-2", isAnalyzing && "animate-spin")} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tokens Monitored</p>
                <p className="text-2xl font-display font-bold">2,847</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy Tokens</p>
                <p className="text-2xl font-display font-bold text-success">2,156</p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-display font-bold text-warning">542</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-destructive/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-display font-bold text-destructive">149</p>
              </div>
              <Activity className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Token Health Analysis</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tokens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredTokens.map(token => (
                <motion.div
                  key={token.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    selectedToken?.symbol === token.symbol 
                      ? "bg-primary/10 border-primary/50 shadow-glow-purple/20" 
                      : "bg-muted/30 border-border hover:border-primary/30"
                  )}
                  onClick={() => setSelectedToken(token)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <div className="font-bold">{token.symbol}</div>
                        <div className="text-sm text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={cn(
                          "text-lg font-bold",
                          token.volumeChange >= 0 ? "text-success" : "text-destructive"
                        )}>
                          {token.volumeChange > 0 ? '+' : ''}{token.volumeChange}%
                        </div>
                        <div className="text-xs text-muted-foreground">24h Vol</div>
                      </div>
                      
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Health</span>
                          <span>{token.health}%</span>
                        </div>
                        <Progress value={token.health} className="h-2" />
                      </div>
                      
                      <Badge className={getRiskColor(token.risk)}>
                        {token.risk.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Token Details */}
        <div className="space-y-6">
          {selectedToken ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    {selectedToken.symbol} Analysis
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overall Health */}
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-5xl font-display font-bold gradient-text mb-2">
                    {selectedToken.health}
                  </div>
                  <div className="text-muted-foreground">AI Health Score</div>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      Volume Change (24h)
                    </div>
                    <span className={selectedToken.volumeChange >= 0 ? "text-success" : "text-destructive"}>
                      {selectedToken.volumeChange > 0 ? '+' : ''}{selectedToken.volumeChange}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      Holder Concentration
                    </div>
                    <span className={selectedToken.holderConcentration > 30 ? "text-warning" : "text-success"}>
                      {selectedToken.holderConcentration}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Wallet className="w-4 h-4 text-muted-foreground" />
                      Whale Activity
                    </div>
                    <span className={selectedToken.whaleActivity > 50 ? "text-warning" : "text-success"}>
                      {selectedToken.whaleActivity}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      Social Score
                    </div>
                    <span className="text-info">{selectedToken.socialScore}/100</span>
                  </div>
                </div>

                {/* Rug Probability */}
                <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Rug Probability</span>
                    <span className="font-bold text-destructive">{selectedToken.rugProbability}%</span>
                  </div>
                  <Progress value={selectedToken.rugProbability} className="h-2 bg-destructive/20" />
                </div>

                <Button className="w-full" variant={selectedToken.risk === 'critical' ? 'destructive' : 'default'}>
                  <Shield className="w-4 h-4 mr-2" />
                  {selectedToken.risk === 'critical' ? 'Trigger Protection' : 'Enable Protection'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a token to view AI analysis</p>
              </CardContent>
            </Card>
          )}

          {/* Risk Alerts */}
          <Card className="border-warning/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Live Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2",
                    alert.severity === 'critical' ? "bg-destructive animate-pulse" : "bg-warning"
                  )} />
                  <div>
                    <div className="font-bold text-sm">{alert.token}</div>
                    <div className="text-xs text-muted-foreground">{alert.message}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
