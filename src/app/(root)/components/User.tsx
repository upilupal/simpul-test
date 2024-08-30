interface UserProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  };
}

export default function User({ user }: UserProps) {
  return (
    <div className="flex items-center bg-white p-4 border-b-2 cursor-pointer hover:bg-gray-100">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>
        <p className="text-gray-500">Click to start chatting</p>
      </div>
    </div>
  );
}