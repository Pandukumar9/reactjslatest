import { Mail, Phone, Globe, Building2, MapPin } from "lucide-react";
import { User } from "../models/user";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-cyan-100 text-cyan-800 rounded-full flex items-center justify-center font-bold text-lg">
          {user.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-cyan-600" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-cyan-600" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-600" />
          <a
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-cyan-700"
          >
            {user.website}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-600" />
          <span>{user.address.city}, {user.address.street}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-600" />
          <span>{user.company.name}</span>
        </div>
      </div>
    </div>
  );
}
