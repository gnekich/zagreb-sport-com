import React from "react";

import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query MyQuery {
    users {
      id
      uuid
      firebase_user_id
      bc_membership_number
      memberships(order_by: { created_at: asc_nulls_last }) {
        id
        number
        type
        status
        expiry
        firstName: first_name
        lastName: last_name
        profilePictureUrl: profile_picture_url
      }
    }
  }
`;

function DisplayMembershipCards() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  const token = useUserStore((state) => state.token);
  if (!token)
    return (
      <div className="p-4">
        <p className="text-gray-300">Please login first</p>
      </div>
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const memberships = data?.users?.[0]?.memberships ?? [];

  return (
    <>
      {memberships.length === 0 ? (
        <>
          <p>You don't have any memberships assigned!</p>
        </>
      ) : (
        memberships.map((membership) => {
          const bgColor =
            membership.type === "Gold" ? "bg-yellow-600" : "bg-gray-700";
          const textColor =
            membership.type === "Gold" ? "text-black" : "text-gray-300";
          return (
            <div key={membership.number} className="w-full pt-5 pb-5">
              <div
                className={`max-w-sm mx-auto ${bgColor} shadow-lg rounded-lg overflow-hidden`}
              >
                <div className="bg-white p-4 flex items-center">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={
                      membership?.profilePictureUrl ??
                      "https://i.pravatar.cc/300?u=c042581f4e29026704d"
                    }
                    alt={`${membership?.firstName} ${membership?.lastName}`}
                  />
                  <div className="w-full flex flex-row justify-between">
                    <div className="w-full flex flex-col items-start justify-between">
                      <h2 className="text-gray-900 text-xl font-bold">{`${membership?.firstName} ${membership?.lastName}`}</h2>
                      <h3 className="text-gray-900 text-xl font-bold">{`#${membership.number} `}</h3>
                    </div>
                    <p className="text-gray-900 text-sm">
                      {membership?.email ?? ""}
                    </p>
                    <div className="mt-4 flex flex-col items-center"></div>
                  </div>
                </div>
                <div className="p-4">
                  <p className={`${textColor} text-left`}>
                    Your membership card ({membership?.type ?? ""})
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

// User store
import useUserStore from "@/stores/useUserStore";

const MembershipCard = () => {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  const memberships = [
    {
      number: "123456789",
      type: "Gold",
      status: "Active",
      expiry: "2025-12-31",
      firstName: "John",
      lastName: "Doe",
      profilePictureUrl: "https://i.pravatar.cc/300?u=a142581f4e29026704d",
    },
    {
      number: "978654321",
      type: "Silver",
      status: "Inactive",
      expiry: "2023-12-31",
      firstName: "John",
      lastName: "Doe Junior",
      profilePictureUrl: "https://i.pravatar.cc/300?u=b042581f4e29026704d",
    },
  ];

  return (
    <>
      {token ? <DisplayMembershipCards /> : <></>}

      {token ? (
        <>
          {memberships.map((membership) => {
            const bgColor =
              membership.type === "Gold" ? "bg-yellow-600" : "bg-gray-700";
            const textColor =
              membership.type === "Gold" ? "text-black" : "text-gray-300";
            return (
              <div key={membership.number} className="w-full pt-5 pb-5">
                <div
                  className={`max-w-sm mx-auto ${bgColor} shadow-lg rounded-lg overflow-hidden`}
                >
                  <div className="bg-white p-4 flex items-center">
                    <img
                      className="w-16 h-16 rounded-full mr-4"
                      src={
                        membership?.profilePictureUrl ??
                        "https://i.pravatar.cc/300?u=c042581f4e29026704d"
                      }
                      alt={`${membership?.firstName} ${membership?.lastName}`}
                    />
                    <div className="w-full flex flex-row justify-between">
                      <h2 className="text-gray-900 text-xl font-bold">{`${membership?.firstName} ${membership?.lastName}`}</h2>
                      <p className="text-gray-900 text-sm">
                        {membership?.email ?? ""}
                      </p>
                      <div className="mt-4 flex flex-col items-center">
                        <QRCodeCanvas
                          value={membership.number}
                          size={60}
                          level="L"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={`${textColor} text-left`}>
                      Your membership card ({membership?.type ?? ""})
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="p-4">
          <p className="text-gray-300">Please login first</p>
        </div>
      )}
    </>
  );
};

export default DisplayMembershipCards;
