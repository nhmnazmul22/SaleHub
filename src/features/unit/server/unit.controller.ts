import { NextRequest } from "next/server";
import * as UnitService from "@/features/unit/server/unit.service";
import { verifyAdminAuth } from "@/lib/verifyAuth";
import { handleError } from "@/helper/error.helper";
import ResponseStatus from "@/config/status";
import { NextResponse } from "next/server";
import {
  unitSchemaType,
  unitUpdateSchemaType,
} from "@/features/unit/shared/unit.validation";
import { ValidationError } from "@/shared/errors/ValidationError";
import z from "zod";

export const getUnits = async () => {
   try {
       // Check Authentication
       await verifyAdminAuth();

       const units = await UnitService.getUnits();
       return NextResponse.json(
         {
           success: true,
           message: "Units retrieved successful",
           data: units,
         },
         { status: ResponseStatus.SUCCESS },
       );
     } catch (error) {
       return handleError(error);
     }
};

export const getUnitById = async (ctx: RouteContext<"/api/units/[id]">) => {
   try {
       // Check admin Authentication
       await verifyAdminAuth();

       const { id } = await ctx.params;

       const unit = await UnitService.getUnitById(id);

       return NextResponse.json(
         {
           success: true,
           message: "Unit retrieved successful",
           data: unit,
         },
         { status: ResponseStatus.SUCCESS },
       );
     } catch (error) {
       return handleError(error);
     }
};

export const createUnit = async (req: NextRequest) => {
    try {
       // Check Authentication
       await verifyAdminAuth();

       const body = await req.json();
       const validationResult = unitSchemaType.safeParse(body);

       if (!validationResult.success) {
         throw new ValidationError(
           z.flattenError(validationResult.error).fieldErrors,
         );
       }

       const result = await UnitService.createUnit(validationResult.data);
       return NextResponse.json(
         {
           success: true,
           message: "Unit created successfully",
           data: result,
         },
         { status: ResponseStatus.CREATED },
       );
     } catch (error) {
       return handleError(error);
     }
};

export const updateUnit = async (
  ctx: RouteContext<"/api/units/[id]">,
  req: NextRequest,
) => {
   try {
     // Check Authentication
     await verifyAdminAuth();

     const { id } = await ctx.params;
     const body = await req.json();

     // validation
     const validationResult = unitUpdateSchemaType.safeParse(body);

     if (!validationResult.success) {
       throw new ValidationError(
         z.flattenError(validationResult.error).fieldErrors,
       );
     }

     const result = await UnitService.updateUnit(id, body);
     return NextResponse.json(
       {
         success: true,
         message: "Unit updated successful",
         data: result,
       },
       { status: ResponseStatus.ACCEPTED },
     );
   } catch (error) {
     return handleError(error);
   }
};

export const deleteUnit = async (ctx: RouteContext<"/api/units/[id]">) => {
   try {
       // Check Authentication
       await verifyAdminAuth();

       const { id } = await ctx.params;

       const result = await UnitService.deleteUnit(id);

       return NextResponse.json(
         {
           success: true,
           message: "Unit deleted successful",
           data: result,
         },
         { status: ResponseStatus.SUCCESS },
       );
     } catch (error) {
       return handleError(error);
     }
};

