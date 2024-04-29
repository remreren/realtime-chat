import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { useLoginStore } from "@/stores/loginStore.tsx";

export function Rooms({ rooms, username }: RoomButtonListProps) {
  return (
    <div className={"min-h-screen"}>
      <div className={"relative flex min-h-screen flex-col justify-center"}>
        <div className={"container"}>
          <RoomsListContainer rooms={rooms} username={username} />
        </div>
      </div>
    </div>
  );
}

export type Room = {
  id: number;
  name: string;
};

export type RoomButtonListProps = {
  rooms: Room[];
  username: string;
};


export function RoomsListContainer({ rooms, username }: RoomButtonListProps) {
  return (
    <Card>
      <RoomsList username={username} rooms={rooms} />
    </Card>
  );
}

function RoomsList({ rooms, username }: RoomButtonListProps) {
  const { logout } = useLoginStore();

  return (
    <>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
        <CardDescription>Hi, {username}! Join a room to start chatting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"grid grid-cols-3 gap-4"}>
          {rooms.map((room) => (
            <RoomButton key={room.id} roomName={room.name} roomId={room.id} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div>
          Not {username}?{" "}<a href={"/auth/login"} onClick={logout} className={"underline"}>Logout</a>
        </div>
      </CardFooter>
    </>
  );
}

type RoomButtonProps = {
  roomName: string;
  roomId: number;
};

function RoomButton({ roomName }: RoomButtonProps) {
  return (
    <Card className={"flex-1 h-fit transition-all hover:scale-[1.02] active:scale-105"} onClick={() => {
      console.log(`Joining room ${roomName}`);
    }}>
      <CardHeader className={"items-center"}>{roomName}</CardHeader>
    </Card>
  );
}