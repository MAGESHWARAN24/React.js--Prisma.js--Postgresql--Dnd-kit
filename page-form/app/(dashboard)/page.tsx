import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6"/>
        <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6"/>
      <CreateFormBtn/>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}
interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}
function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard
      title="Total visits"
      loading={loading}
      icon={<LuView className="text-blue-600" />}
      helperText="All time form visits"
      Value={data?.visits.toLocaleString() || ""}
      className="shadow-md shadow-blue-600"
    />
    <StatsCard
      title="Total submissions"
      loading={loading}
      icon={<FaWpforms className="text-yellow-600" />}
      helperText="All time form submissions"
      Value={data?.submissions.toLocaleString() || ""}
      className="shadow-md shadow-yellow-600"
    />
    <StatsCard
      title="Submission rate"
      loading={loading}
      icon={<HiCursorClick className="text-green-600" />}
      helperText="Visits that result in form submission"
      Value={data?.submissionsRate.toLocaleString()+"%" || ""}
      className="shadow-md shadow-green-600"
    />
    <StatsCard
      title="Bounce rate"
      loading={loading}
      icon={<TbArrowBounce className="text-red-600" />}
      helperText="Visits that leaves  without interacting"
      Value={data?.bounceRate.toLocaleString()+"%" || ""}
      className="shadow-md shadow-red-600"
    />
  </div>
}

function StatsCard(
  {
    title,
    Value,
    icon,
    helperText,
    loading,
    className,
  }:
    {
      title: String;
      Value: string;
      helperText: string;
      loading: boolean;
      icon: ReactNode;
      className: string;
    }) 
{
  return ( 
  <Card className = {className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {
          loading && <Skeleton>
            <span className="opacity-0">0</span>
          </Skeleton>
        }
        {!loading && Value}
      </div>
      <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
    </CardContent>
  </Card>)
}