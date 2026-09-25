import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthHOC from "./AuthHOC";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { userProfile, userUpdate } from "@/redux/slice/UserAuth";
import { Card, CardContent } from "../ui/card";

const UpdateUser = () => {
  const { user, loading } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    birth_time: "",
    birth_place: "",
    gender: "",
    about: "",
  });

  /* ---------------- Sync Redux User ---------------- */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        address: user.address || "",
        dob: user.dob || "",
        birth_time: user.birth_time || "",
        birth_place: user.birth_place || "",
        gender: user.gender || "",
        about: user.about || "",
      });
    }
  }, [user]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated User:", formData);

    try {
      await dispatch(userUpdate(formData)).unwrap();
      await dispatch(userProfile()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <ClipLoader size={40} />
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <section className="py-10">
      <div className="container ">
        <Card className={"border border-black "}>
          <CardContent>
            {/* Avatar */}
            <div className="text-center mb-8">
              <Avatar className="h-24 w-24 border  border-gray-400  mx-auto mb-2">
                <AvatarImage src={user?.avatar || ""} />
                <AvatarFallback className="text-xl">
                  {formData.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground">
                +91 {formData.mobile}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-2">Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label className="mb-2">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="cursor-not-allowed opacity-70"
                  />
                </div>

                <div>
                  <Label className="mb-2">Mobile Number</Label>
                  <Input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-2">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={handleGenderChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label className="mb-2">Time of Birth</Label>
                  <Input
                    type="time"
                    name="birth_time"
                    value={formData.birth_time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">Birth Place</Label>
                  <Input
                    name="birth_place"
                    value={formData.birth_place}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label className="mb-2">Address</Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* About */}
              <div>
                <Label className="mb-2">About</Label>
                <Textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell us something about yourself"
                  className="resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-6">
                <Button type="submit" className="px-10 rounded-full  ">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AuthHOC(UpdateUser);
