import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Calendar, Clock, Globe, Languages, Mail, MapPin, MessageSquare, Phone, PhoneCall, Shield, Star, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {

  const { astrologer, loading } = useSelector((state) => state.astroAuth);
  const { user } = useSelector((state) => state.userAuth)
  const [role,  setRole] = useState(localStorage.getItem("role_id"))

  if (loading) {
    return <p className="text-center   ">loading...</p>;
  }
  // useEffect(()=>{console.log((user?.pincode))},[])
  useEffect(()=>{console.log("hiiiii")},[])
  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 border-b  py-2.5">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 flex-shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-0.5 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm text-foreground break-words">
          {value || <span className="text-muted-foreground/60 italic">Not provided</span>}
        </p>
      </div>

    </div>
  );

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative group">
                <div className="absolute -inset-1   rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>

                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage src={user ? user?.profile_image : astrologer?.profile_image} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-orange-500 text-white text-2xl">
                    {(astrologer?.name || user?.name)?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {astrologer?.isOnline && (
                  <span className="absolute bottom-2 right-2 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-4 border-white shadow-lg"></span>
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="  font-semibold tracking-tight">{(astrologer?.name || user?.name)}</h2>
                      {astrologer?.isVerified && (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {astrologer?.isOnline && (
                        <Badge className="bg-green-500 text-white hover:bg-green-600">
                          <div className="w-2 h-2 bg-white rounded-full mr-0.5 animate-pulse"></div>
                          Online
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">@{(astrologer?.username) || (user?.username)}</span>
                      <span className="text-xs">•</span>
                      <span className="text-sm font-mono">{(astrologer?.code) || (user?.code)}</span>
                    </div>
                  </div>


                </div>

                {role == 2 &&
                  <>
                    <div className="flex gap-2 flex-wrap">
                      {astrologer?.expertise?.map((exp) => (
                        <Badge key={exp} variant="secondary" className="capitalize font-medium">
                          {exp}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <StatCard
                        icon={Star}
                        label="Total"
                        value={`${astrologer?.rating | 0}/5.0`}
                        color="bg-gradient-to-br from-amber-400 to-orange-500"
                      />
                      <StatCard
                        icon={MessageSquare}
                        label="Chat Price"
                        value={`₹${astrologer?.chat_price | 0}/min`}
                        color="bg-gradient-to-br from-blue-500 to-cyan-500"
                      />
                      <StatCard
                        icon={PhoneCall}
                        label="Call Price"
                        value={`₹${astrologer?.call_price | 0}/min`}
                        color="bg-gradient-to-br from-green-500 to-emerald-500"
                      />
                    </div>
                  </>
                }
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-md borde pt-0 overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="border-b pb-0! pt-2  bg-primary">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-blue-100">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-1 grid grid-cols-2">

                <InfoItem icon={User} label="Full Name" value={(astrologer?.name) || (user?.name)} />
                <InfoItem icon={User} label="Username" value={(astrologer?.username) || (user?.username)} />
                <InfoItem icon={User} label="Gender" value={(astrologer?.gender) || (user?.gender)} />

                {role == 3 && <>
                  <InfoItem icon={Calendar} label="Date of Birth" value={user?.dob?.split("T")[0]} />
                  <InfoItem icon={MapPin} label="Birth Place" value={ user?.birth_place?.place} />
                  <InfoItem icon={Clock} label="Birth Time" value={user?.birth_time} />
                </>}
              </div>
            </CardContent>
          </Card>
          {
            astrologer && role == 2 &&
            <Card className="shadow-md borde pt-0 overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="border-b pb-0! pt-2  bg-primary">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <Briefcase className="w-5 h-5 text-cyan-600" />
                  </div>
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-4">
                <div className="space-y-1 grid md:grid-cols-2">
                  <InfoItem
                    icon={Briefcase}
                    label="Experience"
                    value={astrologer?.experience ? `${astrologer?.experience} years` : `${astrologer?.experience} years`}
                  />
                  <InfoItem
                    icon={Award}
                    label="Expertise"
                    value={astrologer?.expertise?.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}
                  />
                  <InfoItem
                    icon={Languages}
                    label="Languages"
                    value={astrologer?.languages?.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                  />
                  <InfoItem
                    icon={Star}
                    label="Specialization"
                    value={astrologer?.category?.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
                  />
                </div>
              </CardContent>
            </Card>
          }

          <Card className="shadow-md borde pt-0 overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="border-b pb-0! pt-2  bg-primary">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-green-100">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="mb-4 ">
              <div className="space-y-1">
                <InfoItem icon={Mail} label="Email" value={(astrologer?.email) || (user?.email)} />
                <InfoItem
                  icon={Phone}
                  label="Mobile"
                  value={astrologer?.mobile ? `${astrologer?.country_code + " " + astrologer?.mobile}   ` : `${user?.country_code + " " + user?.mobile}`}
                />
                <InfoItem icon={MapPin} label="Address" value={(astrologer?.address) || (user?.address)} />
                <InfoItem icon={MapPin} label="Pincode" value={(astrologer?.pincode) || (user?.pincode)} />
              </div>
            </CardContent>
          </Card>



          {astrologer && role == 2 && <Card className="shadow-md borde pt-0 overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="border-b pb-0! pt-2  bg-primary">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="mb-4 ">
              <div className="space-y-1">
                <InfoItem
                  icon={Star}
                  label="Overall Rating"
                  value={`${astrologer?.rating} out of 5.0`}
                />
                <InfoItem
                  icon={Star}
                  label="Total Reviews"
                  value={astrologer?.rating_count}
                />
                <InfoItem
                  icon={Clock}
                  label="Last Active"
                  value={new Date(astrologer?.last_seen_at).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                />
                {/* <InfoItem
                  icon={Calendar}
                  label="Joined On"
                  value={new Date(astrologer?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                /> */}
              </div>
            </CardContent>
          </Card>
          }
        </div>

        <Card className="shadow-md borde pt-0 overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="border-b pb-0! pt-2  bg-primary">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 rounded-lg bg-slate-100">
                <Globe className="w-5 h-5 text-slate-600" />
              </div>
              About
            </CardTitle>

          </CardHeader>
          <CardContent className="mb-4">
            {(astrologer?.about) || (user?.about) ? (
              <p className="text-sm text-foreground leading-relaxed">{(astrologer?.about) || (user?.about)}</p>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-slate-100 mb-4">
                  <Globe className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">No information provided yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">The astrologer hasn't added their bio</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div >
  );
}

export default Dashboard;