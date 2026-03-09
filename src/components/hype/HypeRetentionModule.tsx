import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  MessageCircle, 
  Twitter, 
  Send, 
  Zap,
  Flame,
  Trophy,
  Users,
  Calendar,
  ThumbsUp,
  Share2,
  Image,
  Sparkles,
  Target,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const sentimentData = [
  { platform: 'Twitter', sentiment: 78, mentions: '12.4K', trend: '+15%' },
  { platform: 'Telegram', sentiment: 65, mentions: '8.2K', trend: '-3%' },
  { platform: 'Reddit', sentiment: 82, mentions: '4.1K', trend: '+28%' },
]

const activeEvents = [
  { 
    id: 1, 
    name: 'Meme Contest #12', 
    participants: 847, 
    prize: '5,000 SOL',
    endsIn: '2 days',
    type: 'contest'
  },
  { 
    id: 2, 
    name: 'Viral Challenge', 
    participants: 2341, 
    prize: '10M PEPE',
    endsIn: '5 hours',
    type: 'challenge'
  },
  { 
    id: 3, 
    name: 'Story DAO Launch', 
    participants: 156, 
    prize: 'NFT Drops',
    endsIn: '1 week',
    type: 'dao'
  },
]

const aiGeneratedContent = [
  { 
    type: 'meme', 
    prompt: 'When your coin does 10x after the AI hype cycle',
    likes: '2.4K',
    shares: 456
  },
  { 
    type: 'thread', 
    title: 'Why Memecoins Are the Future of Crypto',
    likes: '1.8K',
    shares: 892
  },
  { 
    type: 'tweet', 
    content: 'Just bridged my PEPE to Solana. Zero tax. Lightning fast. This is the way. 🐸🚀',
    likes: '892',
    shares: 234
  },
]

const loyaltyPoints = {
  current: 4250,
  earnedToday: 150,
  tier: 'Diamond',
  nextReward: 500,
  history: [
    { action: 'Bridge completed', points: 50, time: '2h ago' },
    { action: 'Event participated', points: 100, time: '5h ago' },
    { action: 'Content shared', points: 25, time: '1d ago' },
    { action: 'Referral bonus', points: 200, time: '2d ago' },
  ]
}

export function HypeRetentionModule() {
  const [selectedEvent, setSelectedEvent] = useState<typeof activeEvents[0] | null>(null)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">Hype Retention</h1>
          <p className="text-muted-foreground mt-1">AI-powered sentiment analysis & community engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Gen AI Active
          </Badge>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Generate Content
          </Button>
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sentimentData.map((item, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {item.platform === 'Twitter' && <Twitter className="w-5 h-5 text-blue-400" />}
                  {item.platform === 'Telegram' && <Send className="w-5 h-5 text-cyan-400" />}
                  {item.platform === 'Reddit' && <MessageCircle className="w-5 h-5 text-orange-400" />}
                  <span className="font-medium">{item.platform}</span>
                </div>
                <Badge variant={item.trend.startsWith('+') ? 'default' : 'destructive'}>
                  {item.trend}
                </Badge>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-display font-bold">{item.sentiment}%</div>
                  <div className="text-sm text-muted-foreground">Sentiment Score</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">{item.mentions}</div>
                  <div className="text-xs text-muted-foreground">Mentions</div>
                </div>
              </div>
              <Progress value={item.sentiment} className="mt-4 h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-warning" />
                Active Events
              </CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        event.type === 'contest' && "bg-purple-500/20 text-purple-400",
                        event.type === 'challenge' && "bg-red-500/20 text-red-400",
                        event.type === 'dao' && "bg-blue-500/20 text-blue-400"
                      )}>
                        {event.type === 'contest' && <Trophy className="w-5 h-5" />}
                        {event.type === 'challenge' && <Target className="w-5 h-5" />}
                        {event.type === 'dao' && <Users className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold">{event.name}</div>
                        <div className="text-sm text-muted-foreground">Ends in {event.endsIn}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-success">{event.prize}</div>
                      <div className="text-xs text-muted-foreground">{event.participants.toLocaleString()} joined</div>
                    </div>
                  </div>
                  <Progress value={(event.participants / 3000) * 100} className="h-1.5" />
                </motion.div>
              ))}
            </div>

            {/* AI Generated Content Preview */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI-Generated Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiGeneratedContent.map((content, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50 border border-border">
                    {content.type === 'meme' && (
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-3 flex items-center justify-center">
                        <Image className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                    <div className="font-medium text-sm mb-2">
                      {content.type === 'meme' && 'Generated Meme'}
                      {content.type === 'thread' && content.title}
                      {content.type === 'tweet' && content.content.slice(0, 50) + '...'}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {content.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> {content.shares}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Points */}
        <div className="space-y-6">
          {/* Points Card */}
          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Loyalty Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-display font-bold gradient-text">
                  {loyaltyPoints.current.toLocaleString()}
                </div>
                <div className="text-muted-foreground">Current Points</div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <Badge>{loyaltyPoints.tier}</Badge>
                <span className="text-sm text-muted-foreground">
                  +{loyaltyPoints.earnedToday} today
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Next Reward</span>
                  <span>{loyaltyPoints.current}/{loyaltyPoints.nextReward}</span>
                </div>
                <Progress value={(loyaltyPoints.current / loyaltyPoints.nextReward) * 100} />
              </div>

              <Button className="w-full" variant="outline">
                Redeem Rewards
              </Button>
            </CardContent>
          </Card>

          {/* Points History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loyaltyPoints.history.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.action}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">+{item.points}</Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Boost Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Twitter className="w-4 h-4 mr-2" />
                Share on Twitter
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Invite to Telegram
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Refer Friends (+200 pts)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
