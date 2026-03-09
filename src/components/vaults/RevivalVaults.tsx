import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FlaskConical, 
  TrendingUp, 
  TrendingDown, 
  Users,
  Vote,
  Zap,
  Plus,
  ArrowRight,
  DollarSign,
  Shield,
  Clock,
  Lock,
  Unlock,
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface DeadToken {
  id: string
  symbol: string
  name: string
  marketCap: number
  decline: number
  holderCount: number
  vaultProgress: number
  status: 'vaulted' | 'reviving' | 'revived'
  daysDead: number
  revivalProposals: number
}

const deadTokens: DeadToken[] = [
  { id: '1', symbol: 'ELON', name: 'ElonMars', marketCap: 45000, decline: -98.5, holderCount: 1200, vaultProgress: 65, status: 'vaulted', daysDead: 45, revivalProposals: 3 },
  { id: '2', symbol: 'AIT', name: 'Aitana', marketCap: 12000, decline: -95.2, holderCount: 850, vaultProgress: 30, status: 'reviving', daysDead: 120, revivalProposals: 1 },
  { id: '3', symbol: 'GRUMPY', name: 'Grumpy Cat', marketCap: 8000, decline: -92.8, holderCount: 2100, vaultProgress: 100, status: 'revived', daysDead: 180, revivalProposals: 5 },
  { id: '4', symbol: 'ROGUE', name: 'Rogue', marketCap: 2500, decline: -99.1, holderCount: 340, vaultProgress: 0, status: 'vaulted', daysDead: 60, revivalProposals: 0 },
]

const proposals = [
  { id: 1, title: 'Liquidity Injection', tokens: '50 SOL', votes: 156, status: 'active' },
  { id: 2, title: 'Rebranding Campaign', tokens: '25 SOL', votes: 89, status: 'active' },
  { id: 3, title: 'Marketing Push', tokens: '30 SOL', votes: 234, status: 'passed' },
]

export function RevivalVaults() {
  const [vaultAmount, setVaultAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState<DeadToken | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vaulted':
        return <Badge variant="outline" className="gap-1"><Lock className="w-3 h-3" /> Vaulted</Badge>
      case 'reviving':
        return <Badge className="bg-warning/20 text-warning gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Reviving</Badge>
      case 'revived':
        return <Badge className="bg-success/20 text-success gap-1"><Sparkles className="w-3 h-3" /> Revived</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">Revival Vaults</h1>
          <p className="text-muted-foreground mt-1">Rescue dead memecoins through community-driven revival</p>
        </div>
        <Badge variant="outline" className="gap-2">
          <FlaskConical className="w-4 h-4 text-primary" />
          AI-Powered Analysis
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tokens Vaulted</p>
                <p className="text-2xl font-display font-bold">1,247</p>
              </div>
              <FlaskConical className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Successfully Revived</p>
                <p className="text-2xl font-display font-bold text-success">342</p>
              </div>
              <Sparkles className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Revival</p>
                <p className="text-2xl font-display font-bold text-warning">156</p>
              </div>
              <RefreshCw className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Value Rescued</p>
                <p className="text-2xl font-display font-bold">$2.4M</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vault List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dead Tokens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Vaulted Tokens
              </CardTitle>
              <CardDescription>Dead memecoins waiting for revival</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deadTokens.map((token) => (
                  <motion.div
                    key={token.id}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer transition-all",
                      selectedToken?.id === token.id 
                        ? "bg-primary/10 border-primary/50" 
                        : "bg-muted/30 border-border hover:border-primary/30"
                    )}
                    onClick={() => setSelectedToken(token)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <span className="text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {token.symbol}
                            {getStatusBadge(token.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-mono text-sm">${token.marketCap.toLocaleString()}</div>
                        <div className="text-xs text-destructive">{token.decline}%</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Holders</div>
                        <div className="font-medium">{token.holderCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Days Dead</div>
                        <div className="font-medium">{token.daysDead}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Proposals</div>
                        <div className="font-medium">{token.revivalProposals}</div>
                      </div>
                    </div>
                    
                    {token.vaultProgress > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Revival Progress</span>
                          <span>{token.vaultProgress}%</span>
                        </div>
                        <Progress value={token.vaultProgress} className="h-1.5" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* DAO Proposals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-info" />
                Active Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold">{proposal.title}</div>
                      <Badge variant={proposal.status === 'passed' ? 'default' : 'outline'}>
                        {proposal.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {proposal.tokens}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {proposal.votes} votes
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        Vote <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Vault Token */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Add to Vault
              </CardTitle>
              <CardDescription>Contribute to rescue dead tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Token to Vault</label>
                <Input 
                  placeholder="e.g., ELON, AIT" 
                  className="font-mono"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                <Input 
                  type="number"
                  placeholder="0.00"
                  value={vaultAmount}
                  onChange={(e) => setVaultAmount(e.target.value)}
                  className="font-mono"
                />
              </div>

              <Button className="w-full">
                <FlaskConical className="w-4 h-4 mr-2" />
                Start Vault
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Vaulted tokens earn revival rewards when the token is successfully revived
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">How Revival Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium text-sm">AI Detection</div>
                  <div className="text-xs text-muted-foreground">AI identifies dead tokens with revival potential</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Community Vault</div>
                  <div className="text-xs text-muted-foreground">Holders contribute to liquidity pool</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium text-sm">DAO Governance</div>
                  <div className="text-xs text-muted-foreground">Proposals vote on revival strategy</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Token Revived</div>
                  <div className="text-xs text-muted-foreground">Revived token launches with new utility</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-info/30 bg-info/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-info">
                <Sparkles className="w-5 h-5" />
                AI Revival Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedToken ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{selectedToken.symbol}</span>
                    <span className="font-bold text-success">72%</span>
                  </div>
                  <Progress value={72} className="h-2 bg-info/20" />
                  <p className="text-xs text-muted-foreground">
                    High revival potential based on holder engagement and community sentiment
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a token to see AI revival score
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
